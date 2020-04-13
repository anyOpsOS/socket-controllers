import { ActionMetadata } from "./ActionMetadata";
import { SocketControllerMetadataArgs } from "./args/SocketControllerMetadataArgs";
import { UseMetadata } from "./UseMetadata";
export declare class ControllerMetadata {
    /**
     * Controller actions.
     */
    actions: ActionMetadata[];
    /**
     * Indicates object which is used by this controller.
     */
    target: Function;
    /**
     * Base route for all actions registered in this controller.
     */
    namespace: string | RegExp;
    /**
     * Middleware "use"-s applied to a whole controller.
     */
    uses: UseMetadata[];
    constructor(args: SocketControllerMetadataArgs);
    readonly instance: any;
}
