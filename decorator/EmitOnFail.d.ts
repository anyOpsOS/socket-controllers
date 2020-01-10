import { ClassTransformOptions } from "class-transformer";
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution.
 * It will emit message only if controller throw an exception.
 * If result is a Promise then it will wait until promise throw an error and emit a message.
 */
export declare function EmitOnFail(messageName: string, options?: {
    classTransformOptions?: ClassTransformOptions;
}): Function;
