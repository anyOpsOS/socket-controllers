import { ClassTransformOptions } from "class-transformer";
import { CurrentUserChecker } from "./CurrentUserChecker";
import { SocketControllersOptions } from "./SocketControllersOptions";
/**
 * Registers controllers and actions in the given server framework.
 */
export declare class SocketControllerExecutor {
    /**
     * Indicates if class-transformer package should be used to perform message body serialization / deserialization.
     * By default its enabled.
     */
    useClassTransformer: boolean;
    /**
     * Global class transformer options passed to class-transformer during classToPlain operation.
     * This operation is being executed when server returns response to user.
     */
    classToPlainTransformOptions: ClassTransformOptions;
    /**
     * Global class transformer options passed to class-transformer during plainToClass operation.
     * This operation is being executed when parsing user parameters.
     */
    plainToClassTransformOptions: ClassTransformOptions;
    /**
     * Special function used to get currently authorized user.
     */
    currentUserChecker: CurrentUserChecker;
    /**
     * Specified socket.io instance
     */
    io: any;
    private metadataBuilder;
    init(io: any, options: SocketControllersOptions): this;
    execute(controllerClasses?: Function[], middlewareClasses?: Function[]): void;
    /**
     * Registers middlewares.
     */
    private registerMiddlewares;
    /**
     * Registers controllers.
     */
    private registerControllers;
    private handleConnection;
    private handleAction;
    private handleParam;
    private handleParamFormat;
    private parseParamValue;
    private handleSuccessResult;
    private handleFailResult;
    private handleNamespaceParams;
}
