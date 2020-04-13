"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects connected client's socket object to the controller action.
 */
function ConnectedSocket() {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.CONNECTED_SOCKET,
            reflectedType: format
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.ConnectedSocket = ConnectedSocket;

//# sourceMappingURL=ConnectedSocket.js.map
