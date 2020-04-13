"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/**
 * Specifies a given middleware to be used for controller.
 * Must be set to controller class.
 */
function UseMiddleware(...middlewares) {
    return function (object) {
        middlewares.forEach(middleware => {
            index_1.defaultMetadataArgsStorage().uses.push({
                target: object,
                middleware: middleware,
            });
        });
    };
}
exports.UseMiddleware = UseMiddleware;

//# sourceMappingURL=UseMiddleware.js.map
