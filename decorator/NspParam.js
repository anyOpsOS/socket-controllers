"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamTypes_1 = require("../metadata/types/ParamTypes");
const index_1 = require("../index");
/**
 * Injects named param from the connected socket namespace.
 */
function NspParam(name) {
    return function (object, methodName, index) {
        let format = Reflect.getMetadata("design:paramtypes", object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParamTypes_1.ParamTypes.NAMESPACE_PARAM,
            reflectedType: format,
            value: name
        };
        index_1.defaultMetadataArgsStorage().params.push(metadata);
    };
}
exports.NspParam = NspParam;

//# sourceMappingURL=NspParam.js.map
