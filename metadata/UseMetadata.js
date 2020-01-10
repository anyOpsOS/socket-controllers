"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("../container");
/**
 * "Use middleware" metadata.
 */
var UseMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function UseMetadata(args) {
        this.target = args.target;
        this.middleware = args.middleware;
    }
    Object.defineProperty(UseMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        get: function () {
            return container_1.getFromContainer(this.middleware);
        },
        enumerable: true,
        configurable: true
    });
    return UseMetadata;
}());
exports.UseMetadata = UseMetadata;

//# sourceMappingURL=UseMetadata.js.map
