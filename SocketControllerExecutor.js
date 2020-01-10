"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataBuilder_1 = require("./metadata-builder/MetadataBuilder");
var class_transformer_1 = require("class-transformer");
var ActionTypes_1 = require("./metadata/types/ActionTypes");
var ParameterParseJsonError_1 = require("./error/ParameterParseJsonError");
var ParamTypes_1 = require("./metadata/types/ParamTypes");
var pathToRegexp = require("path-to-regexp");
/**
 * Registers controllers and actions in the given server framework.
 */
var SocketControllerExecutor = /** @class */ (function () {
    function SocketControllerExecutor() {
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    SocketControllerExecutor.prototype.init = function (io, options) {
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
    };
    SocketControllerExecutor.prototype.execute = function (controllerClasses, middlewareClasses) {
        this.registerControllers(controllerClasses);
        this.registerMiddlewares(middlewareClasses);
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    /**
     * Registers middlewares.
     */
    SocketControllerExecutor.prototype.registerMiddlewares = function (classes) {
        var _this = this;
        var middlewares = this.metadataBuilder.buildMiddlewareMetadata(classes);
        middlewares
            .sort(function (middleware1, middleware2) { return middleware1.priority - middleware2.priority; })
            .forEach(function (middleware) {
            _this.io.use(function (socket, next) {
                middleware.instance.use(socket, next);
            });
        });
        return this;
    };
    /**
     * Registers controllers.
     */
    SocketControllerExecutor.prototype.registerControllers = function (classes) {
        var _this = this;
        var controllers = this.metadataBuilder.buildControllerMetadata(classes);
        var controllersWithoutNamespaces = controllers.filter(function (ctrl) { return !ctrl.namespace; });
        var controllersWithNamespaces = controllers.filter(function (ctrl) { return !!ctrl.namespace; });
        // register controllers without namespaces
        this.io.on("connection", function (socket) { return _this.handleConnection(controllersWithoutNamespaces, socket); });
        // register controllers with namespaces
        controllersWithNamespaces.forEach(function (controller) {
            var namespace = controller.namespace;
            if (!(namespace instanceof RegExp)) {
                namespace = pathToRegexp(namespace);
            }
            _this.io.of(namespace).on("connection", function (socket) { return _this.handleConnection([controller], socket); });
        });
        return this;
    };
    SocketControllerExecutor.prototype.handleConnection = function (controllers, socket) {
        var _this = this;
        controllers.forEach(function (controller) {
            controller.uses.forEach(function (middleware) {
                socket.use(function (pocket, next) {
                    middleware.instance.use(pocket, next); // TODO: pass socket instance?
                });
            });
            controller.actions.forEach(function (action) {
                if (action.type === ActionTypes_1.ActionTypes.CONNECT) {
                    _this.handleAction(action, { socket: socket })
                        .then(function (result) { return _this.handleSuccessResult(result, action, socket); })
                        .catch(function (error) { return _this.handleFailResult(error, action, socket); });
                }
                else if (action.type === ActionTypes_1.ActionTypes.DISCONNECT) {
                    socket.on("disconnect", function () {
                        _this.handleAction(action, { socket: socket })
                            .then(function (result) { return _this.handleSuccessResult(result, action, socket); })
                            .catch(function (error) { return _this.handleFailResult(error, action, socket); });
                    });
                }
                else if (action.type === ActionTypes_1.ActionTypes.MESSAGE) {
                    socket.on(action.name, function (data, callback) {
                        _this.handleAction(action, { socket: socket, data: data })
                            .then(function (result) { return _this.handleSuccessResult(result, action, socket, callback); })
                            .catch(function (error) { return _this.handleFailResult(error, action, socket, callback); });
                    });
                }
            });
        });
    };
    SocketControllerExecutor.prototype.handleAction = function (action, options) {
        var _this = this;
        // compute all parameters
        var paramsPromises = action.params
            .sort(function (param1, param2) { return param1.index - param2.index; })
            .map(function (param) {
            if (param.type === ParamTypes_1.ParamTypes.CONNECTED_SOCKET) {
                return options.socket;
            }
            else if (param.type === ParamTypes_1.ParamTypes.SOCKET_IO) {
                return _this.io;
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
                return _this.handleNamespaceParams(options.socket, action, param);
            }
            else if (param.type === ParamTypes_1.ParamTypes.NAMESPACE_PARAM) {
                var params = _this.handleNamespaceParams(options.socket, action, param);
                return params[param.value];
            }
            else if (param.type === ParamTypes_1.ParamTypes.CURRENT_USER) {
                return _this.currentUserChecker(options.socket);
            }
            else {
                return _this.handleParam(param, options);
            }
        });
        // after all parameters are computed
        var paramsPromise = Promise.all(paramsPromises).catch(function (error) {
            console.log("Error during computation params of the socket controller: ", error);
            throw error;
        });
        return paramsPromise.then(function (params) {
            return action.executeAction(params);
        });
    };
    SocketControllerExecutor.prototype.handleParam = function (param, options) {
        var value = options.data;
        if (value !== null && value !== undefined && value !== "")
            value = this.handleParamFormat(value, param);
        // if transform function is given for this param then apply it
        if (param.transform)
            value = param.transform(value, options.socket);
        return value;
    };
    SocketControllerExecutor.prototype.handleParamFormat = function (value, param) {
        var format = param.reflectedType;
        var formatName = format instanceof Function && format.name ? format.name : format instanceof String ? format : "";
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
                var isObjectFormat = format instanceof Function || formatName.toLowerCase() === "object";
                if (value && isObjectFormat)
                    value = this.parseParamValue(value, param);
        }
        return value;
    };
    SocketControllerExecutor.prototype.parseParamValue = function (value, paramMetadata) {
        try {
            var parseValue = typeof value === "string" ? JSON.parse(value) : value;
            if (paramMetadata.reflectedType !== Object && paramMetadata.reflectedType && this.useClassTransformer) {
                var options = paramMetadata.classTransformOptions || this.plainToClassTransformOptions;
                return class_transformer_1.plainToClass(paramMetadata.reflectedType, parseValue, options);
            }
            else {
                return parseValue;
            }
        }
        catch (er) {
            throw new ParameterParseJsonError_1.ParameterParseJsonError(value);
        }
    };
    SocketControllerExecutor.prototype.handleSuccessResult = function (result, action, socket, ackCallback) {
        if (result !== null && result !== undefined && action.returnAck && ackCallback instanceof Function) {
            ackCallback(result);
        }
        else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
            ackCallback(action.emitOnSuccess.value);
        }
        if (result !== null && result !== undefined && action.emitOnSuccess) {
            var transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            var transformedResult = this.useClassTransformer && result instanceof Object ? class_transformer_1.classToPlain(result, transformOptions) : result;
            socket.emit(action.emitOnSuccess.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnSuccess.value);
        }
    };
    SocketControllerExecutor.prototype.handleFailResult = function (result, action, socket, ackCallback) {
        if (result !== null && result !== undefined && action.returnAck && ackCallback instanceof Function) {
            ackCallback(result);
        }
        else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
            ackCallback(action.emitOnFail.value);
        }
        if (result !== null && result !== undefined && action.emitOnFail) {
            var transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            var transformedResult = this.useClassTransformer && result instanceof Object ? class_transformer_1.classToPlain(result, transformOptions) : result;
            if (result instanceof Error && !Object.keys(transformedResult).length) {
                transformedResult = result.toString();
            }
            socket.emit(action.emitOnFail.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnFail.value);
        }
    };
    SocketControllerExecutor.prototype.handleNamespaceParams = function (socket, action, param) {
        var _this = this;
        var keys = [];
        var regexp = pathToRegexp(action.controllerMetadata.namespace, keys);
        var parts = regexp.exec(socket.nsp.name);
        var params = [];
        keys.forEach(function (key, index) {
            params[key.name] = _this.handleParamFormat(parts[index + 1], param);
        });
        return params;
    };
    return SocketControllerExecutor;
}());
exports.SocketControllerExecutor = SocketControllerExecutor;

//# sourceMappingURL=SocketControllerExecutor.js.map