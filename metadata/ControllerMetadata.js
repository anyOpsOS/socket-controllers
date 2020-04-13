"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container");
class ControllerMetadata {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(args) {
        this.target = args.target;
        this.namespace = args.namespace;
    }
    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------
    get instance() {
        return container_1.getFromContainer(this.target);
    }
}
exports.ControllerMetadata = ControllerMetadata;

//# sourceMappingURL=ControllerMetadata.js.map
