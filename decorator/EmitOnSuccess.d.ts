import { ClassTransformOptions } from "class-transformer";
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution.
 * It will emit message only if controller succeed without errors.
 * If result is a Promise then it will wait until promise is resolved and emit a message.
 */
export declare function EmitOnSuccess(messageName: string, options?: {
    classTransformOptions?: ClassTransformOptions;
}): Function;
