"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container");
/**
 * "Use middleware" metadata.
 */
class UseMetadata {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(args) {
        this.target = args.target;
        this.middleware = args.middleware;
    }
    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------
    get instance() {
        return container_1.getFromContainer(this.middleware);
    }
}
exports.UseMetadata = UseMetadata;

//# sourceMappingURL=UseMetadata.js.map
