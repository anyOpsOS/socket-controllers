/**
 * Specifies a given middleware to be used for controller.
 * Must be set to controller class.
 */
export declare function UseMiddleware(...middlewares: Array<Function>): Function;
/**
 * Specifies a given middleware to be used for controller.
 * Must be set to controller class.
 */
export declare function UseMiddleware(...middlewares: Array<(pocket: any, next: ((err?: any) => any)) => any>): Function;
