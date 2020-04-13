"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects received message body.
 */
function MessageBody(options) {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
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
