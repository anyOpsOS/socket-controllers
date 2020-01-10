"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamTypes_1 = require("../metadata/types/ParamTypes");
var index_1 = require("../index");
/**
 * Injects query parameter from the received socket request.
 */
function SocketQueryParam(name) {
    return function (object, methodName, index) {
        var format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        var metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.SOCKET_QUERY_PARAM,
            reflectedType: format,
            value: name
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.SocketQueryParam = SocketQueryParam;

//# sourceMappingURL=SocketQueryParam.js.map
