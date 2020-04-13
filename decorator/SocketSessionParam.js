"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects query parameter from the received socket request.
 */
function SocketSessionParam(name) {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_SESSION_PARAM,
            reflectedType: format,
            value: name
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.SocketSessionParam = SocketSessionParam;

//# sourceMappingURL=SocketSessionParam.js.map
