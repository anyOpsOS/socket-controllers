"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamTypes_1 = require("../metadata/types/ParamTypes");
var index_1 = require("../index");
/**
 * Injects request object received by socket.
 */
function SocketRequest() {
    return function (object, methodName, index) {
        var format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        var metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_REQUEST,
            reflectedType: format
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.SocketRequest = SocketRequest;

//# sourceMappingURL=SocketRequest.js.map
