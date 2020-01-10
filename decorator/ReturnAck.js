"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultTypes_1 = require("../metadata/types/ResultTypes");
var index_1 = require("../index");
/**
 * Used in conjunction with @OnMessage decorator.
 * If result returned by controller then messages will be emitted as a callback.
 */
function ReturnAck() {
    return function (object, methodName) {
        var metadata = {
            target: object.constructor,
            method: methodName,
            type: ResultTypes_1.ResultTypes.RETURN_ACK
        };
        index_1.defaultMetadataArgsStorage().results.push(metadata);
    };
}
exports.ReturnAck = ReturnAck;

//# sourceMappingURL=ReturnAck.js.map
