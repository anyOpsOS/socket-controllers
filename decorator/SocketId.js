"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects socket id from the received request.
 */
function SocketId() {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_ID,
            reflectedType: format
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.SocketId = SocketId;

//# sourceMappingURL=SocketId.js.map
