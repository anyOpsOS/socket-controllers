import { ControllerMetadata } from "../metadata/ControllerMetadata";
import { MiddlewareMetadata } from "../metadata/MiddlewareMetadata";
import { UseMetadata } from "../metadata/UseMetadata";
/**
 * Builds metadata from the given metadata arguments.
 */
export declare class MetadataBuilder {
    buildControllerMetadata(classes?: Function[]): ControllerMetadata[];
    buildMiddlewareMetadata(classes?: Function[]): MiddlewareMetadata[];
    private createMiddlewares;
    private createControllers;
    private createActions;
    /**
     * Creates use metadatas for controllers.
     */
    protected createControllerUses(controller: ControllerMetadata): UseMetadata[];
    private createParams;
    private createResults;
}
