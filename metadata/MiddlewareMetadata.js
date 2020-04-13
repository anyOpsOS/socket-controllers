"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container");
class MiddlewareMetadata {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(args) {
        this.target = args.target;
        this.priority = args.priority;
    }
    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------
    get instance() {
        return container_1.getFromContainer(this.target);
    }
}
exports.MiddlewareMetadata = MiddlewareMetadata;

//# sourceMappingURL=MiddlewareMetadata.js.map
