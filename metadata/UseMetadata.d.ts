import { UseMetadataArgs } from "./args/UseMetadataArgs";
import { MiddlewareInterface } from "../MiddlewareInterface";
/**
 * "Use middleware" metadata.
 */
export declare class UseMetadata {
    /**
     * Object class of the middleware class.
     */
    target: Function;
    /**
     * Middleware to be executed by this "use".
     */
    middleware: Function;
    constructor(args: UseMetadataArgs);
    readonly instance: MiddlewareInterface;
}
