"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes_1 = require("../metadata/types/ActionTypes");
var index_1 = require("../index");
/**
 * Registers controller's action to be executed when client disconnects from the socket.
 */
function OnDisconnect() {
    return function (object, methodName) {
        var metadata = {
            target: object.constructor,
            method: methodName,
            type: ActionTypes_1.ActionTypes.DISCONNECT
        };
        index_1.defaultMetadataArgsStorage().actions.push(metadata);
    };
}
exports.OnDisconnect = OnDisconnect;

//# sourceMappingURL=OnDisconnect.js.map
