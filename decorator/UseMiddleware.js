"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Specifies a given middleware to be used for controller.
 * Must be set to controller class.
 */
function UseMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (object) {
        middlewares.forEach(function (middleware) {
            index_1.defaultMetadataArgsStorage().uses.push({
                target: object,
                middleware: middleware,
            });
        });
    };
}
exports.UseMiddleware = UseMiddleware;

//# sourceMappingURL=UseMiddleware.js.map
