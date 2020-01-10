"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamTypes_1 = require("../metadata/types/ParamTypes");
var index_1 = require("../index");
/**
 * Injects received message body.
 */
function MessageBody(options) {
    return function (object, methodName, index) {
        var format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        var metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_BODY,
            reflectedType: format,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.MessageBody = MessageBody;

//# sourceMappingURL=MessageBody.js.map
