"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes_1 = require("../metadata/types/ActionTypes");
var index_1 = require("../index");
/**
 * Registers controller's action to be executed when socket receives message with given name.
 */
function OnMessage(name) {
    return function (object, methodName) {
        var metadata = {
            name: name,
            target: object.constructor,
            method: methodName,
            type: ActionTypes_1.ActionTypes.MESSAGE
        };
        index_1.defaultMetadataArgsStorage().actions.push(metadata);
    };
}
exports.OnMessage = OnMessage;

//# sourceMappingURL=OnMessage.js.map
