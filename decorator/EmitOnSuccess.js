"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResultTypes_1 = require("../metadata/types/ResultTypes");
const index_1 = require("../index");
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution.
 * It will emit message only if controller succeed without errors.
 * If result is a Promise then it will wait until promise is resolved and emit a message.
 */
function EmitOnSuccess(messageName, options) {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: ResultTypes_1.ResultTypes.EMIT_ON_SUCCESS,
            value: messageName,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined
        };
        index_1.defaultMetadataArgsStorage().results.push(metadata);
    };
}
exports.EmitOnSuccess = EmitOnSuccess;

//# sourceMappingURL=EmitOnSuccess.js.map
