"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamTypes_1 = require("../metadata/types/ParamTypes");
var index_1 = require("../index");
/**
 * Injects named param from the connected socket namespace.
 */
function CurrentUser() {
    return function (object, methodName, index) {
        var format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        var metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.CURRENT_USER,
            reflectedType: format,
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.CurrentUser = CurrentUser;

//# sourceMappingURL=CurrentUser.js.map
