"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a class to be a socket controller that can listen to websocket events and respond to them.
 *
 * @param namespace Namespace in which this controller's events will be registered.
 */
function SocketController(namespace) {
    return function (object) {
        var metadata = {
            namespace: namespace,
            target: object
        };
        index_1.defaultMetadataArgsStorage().controllers.push(metadata);
    };
}
exports.SocketController = SocketController;

//# sourceMappingURL=SocketController.js.map
