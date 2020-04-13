"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetadataBuilder_1 = require("./metadata-builder/MetadataBuilder");
const class_transformer_1 = require("class-transformer");
const ActionTypes_1 = require("./metadata/types/ActionTypes");
const ParameterParseJsonError_1 = require("./error/ParameterParseJsonError");
const ParamTypes_1 = require("./metadata/types/ParamTypes");
const pathToRegexp = require("path-to-regexp");
/**
 * Registers controllers and actions in the given server framework.
 */
class SocketControllerExecutor {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    init(io, options) {
        this.io = io;
        this.metadataBuilder = new MetadataBuilder_1.MetadataBuilder();
        if (options.useClassTransformer !== undefined) {
            this.useClassTransformer = options.useClassTransformer;
        }
        else {
            this.useClassTransformer = true;
        }
        this.classToPlainTransformOptions = options.classToPlainTransformOptions;
        this.plainToClassTransformOptions = options.plainToClassTransformOptions;
        this.currentUserChecker = options.currentUserChecker;
        return this;
    }
    execute(controllerClasses, middlewareClasses) {
        this.registerControllers(controllerClasses);
        this.registerMiddlewares(middlewareClasses);
    }
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    /**
     * Registers middlewares.
     */
    registerMiddlewares(classes) {
        const middlewares = this.metadataBuilder.buildMiddlewareMetadata(classes);
        middlewares
            .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
            .forEach(middleware => {
            this.io.use((socket, next) => {
                middleware.instance.use(socket, next);
            });
        });
        return this;
    }
    /**
     * Registers controllers.
     */
    registerControllers(classes) {
        const controllers = this.metadataBuilder.buildControllerMetadata(classes);
        const controllersWithoutNamespaces = controllers.filter(ctrl => !ctrl.namespace);
        const controllersWithNamespaces = controllers.filter(ctrl => !!ctrl.namespace);
        // register controllers without namespaces
        this.io.on("connection", (socket) => this.handleConnection(controllersWithoutNamespaces, socket));
        // register controllers with namespaces
        controllersWithNamespaces.forEach(controller => {
            let namespace = controller.namespace;
            if (!(namespace instanceof RegExp)) {
                namespace = pathToRegexp(namespace);
            }
            this.io.of(namespace).on("connection", (socket) => this.handleConnection([controller], socket));
        });
        return this;
    }
    handleConnection(controllers, socket) {
        controllers.forEach(controller => {
            controller.uses.forEach(middleware => {
                socket.use((pocket, next) => {
                    middleware.instance.use(pocket, next); // TODO: pass socket instance?
                });
            });
            controller.actions.forEach(action => {
                if (action.type === ActionTypes_1.ActionTypes.CONNECT) {
                    this.handleAction(action, { socket: socket })
                        .then(result => this.handleSuccessResult(result, action, socket))
                        .catch(error => this.handleFailResult(error, action, socket));
                }
                else if (action.type === ActionTypes_1.ActionTypes.DISCONNECT) {
                    socket.on("disconnect", () => {
                        this.handleAction(action, { socket: socket })
                            .then(result => this.handleSuccessResult(result, action, socket))
                            .catch(error => this.handleFailResult(error, action, socket));
                    });
                }
                else if (action.type === ActionTypes_1.ActionTypes.MESSAGE) {
                    socket.on(action.name, (data, callback) => {
                        this.handleAction(action, { socket: socket, data: data })
                            .then(result => this.handleSuccessResult(result, action, socket, callback))
                            .catch(error => this.handleFailResult(error, action, socket, callback));
                    });
                }
            });
        });
    }
    handleAction(action, options) {
        // compute all parameters
        const paramsPromises = action.params
            .sort((param1, param2) => param1.index - param2.index)
            .map(param => {
            if (param.type === ParamTypes_1.ParamTypes.CONNECTED_SOCKET) {
                return options.socket;
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_IO) {
                return this.io;
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_QUERY_PARAM) {
                return options.socket.handshake.query[param.value];
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_SESSION_PARAM) {
                return options.socket.request.session[param.value];
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_ID) {
                return options.socket.id;
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_REQUEST) {
                return options.socket.request;
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_ROOMS) {
                return options.socket.rooms;
            }
            else if (param.type === ParamTypes_1.ParamTypes.NAMESPACE_PARAMS) {
                return this.handleNamespaceParams(options.socket, action, param);
            }
            else if (param.type === ParamTypes_1.ParamTypes.NAMESPACE_PARAM) {
                const params = this.handleNamespaceParams(options.socket, action, param);
                return params[param.value];
            }
            else if (param.type === ParamTypes_1.ParamTypes.CURRENT_USER) {
                return this.currentUserChecker(options.socket);
            }
            else {
                return this.handleParam(param, options);
            }
        });
        // after all parameters are computed
        const paramsPromise = Promise.all(paramsPromises).catch(error => {
            console.log("Error during computation params of the socket controller: ", error);
            throw error;
        });
        return paramsPromise.then(params => {
            return action.executeAction(params);
        });
    }
    handleParam(param, options) {
        let value = options.data;
        if (value !== null && value !== undefined && value !== "")
            value = this.handleParamFormat(value, param);
        // if transform function is given for this param then apply it
        if (param.transform)
            value = param.transform(value, options.socket);
        return value;
    }
    handleParamFormat(value, param) {
        const format = param.reflectedType;
        const formatName = format instanceof Function && format.name ? format.name : format instanceof String ? format : "";
        switch (formatName.toLowerCase()) {
            case "number":
                return +value;
            case "string":
                return value;
            case "boolean":
                if (value === "true") {
                    return true;
                }
                else if (value === "false") {
                    return false;
                }
                return !!value;
            default:
                const isObjectFormat = format instanceof Function || formatName.toLowerCase() === "object";
                if (value && isObjectFormat)
                    value = this.parseParamValue(value, param);
        }
        return value;
    }
    parseParamValue(value, paramMetadata) {
        try {
            const parseValue = typeof value === "string" ? JSON.parse(value) : value;
            if (paramMetadata.reflectedType !== Object && paramMetadata.reflectedType && this.useClassTransformer) {
                const options = paramMetadata.classTransformOptions || this.plainToClassTransformOptions;
                return class_transformer_1.plainToClass(paramMetadata.reflectedType, parseValue, options);
            }
            else {
                return parseValue;
            }
        }
        catch (er) {
            throw new ParameterParseJsonError_1.ParameterParseJsonError(value);
        }
    }
    handleSuccessResult(result, action, socket, ackCallback) {
        if (result !== null && result !== undefined && action.returnAck && ackCallback instanceof Function) {
            ackCallback(result);
        }
        else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
            ackCallback(action.emitOnSuccess.value);
        }
        if (result !== null && result !== undefined && action.emitOnSuccess) {
            const transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            let transformedResult = this.useClassTransformer && result instanceof Object ? class_transformer_1.classToPlain(result, transformOptions) : result;
            socket.emit(action.emitOnSuccess.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnSuccess.value);
        }
    }
    handleFailResult(result, action, socket, ackCallback) {
        if (result !== null && result !== undefined && action.returnAck && ackCallback instanceof Function) {
            ackCallback(result);
        }
        else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
            ackCallback(action.emitOnFail.value);
        }
        if (result !== null && result !== undefined && action.emitOnFail) {
            const transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            let transformedResult = this.useClassTransformer && result instanceof Object ? class_transformer_1.classToPlain(result, transformOptions) : result;
            if (result instanceof Error && !Object.keys(transformedResult).length) {
                transformedResult = result.toString();
            }
            socket.emit(action.emitOnFail.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnFail.value);
        }
    }
    handleNamespaceParams(socket, action, param) {
        const keys = [];
        const regexp = pathToRegexp(action.controllerMetadata.namespace, keys);
        const parts = regexp.exec(socket.nsp.name);
        const params = [];
        keys.forEach((key, index) => {
            params[key.name] = this.handleParamFormat(parts[index + 1], param);
        });
        return params;
    }
}
exports.SocketControllerExecutor = SocketControllerExecutor;

//# sourceMappingURL=SocketControllerExecutor.js.map
