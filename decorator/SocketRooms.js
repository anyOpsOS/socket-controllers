"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects rooms of the connected socket client.
 */
function SocketRooms() {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_ROOMS,
            reflectedType: format
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.SocketRooms = SocketRooms;

//# sourceMappingURL=SocketRooms.js.map
