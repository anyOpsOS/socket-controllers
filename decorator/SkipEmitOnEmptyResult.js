"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResultTypes_1 = require("../metadata/types/ResultTypes");
const index_1 = require("../index");
/**
 * Used in conjunction with @EmitOnSuccess and @EmitOnFail decorators.
 * If result returned by controller action is null or undefined then messages will not be emitted by @EmitOnSuccess
 * or @EmitOnFail decorators.
 */
function SkipEmitOnEmptyResult() {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: ResultTypes_1.ResultTypes.SKIP_EMIT_ON_EMPTY_RESULT
        };
        index_1.defaultMetadataArgsStorage().results.push(metadata);
    };
}
exports.SkipEmitOnEmptyResult = SkipEmitOnEmptyResult;

//# sourceMappingURL=SkipEmitOnEmptyResult.js.map
