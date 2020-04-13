"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResultMetadata {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(action, args) {
        this.actionMetadata = action;
        this.target = args.target;
        this.method = args.method;
        this.type = args.type;
        this.value = args.value;
        this.classTransformOptions = args.classTransformOptions;
    }
}
exports.ResultMetadata = ResultMetadata;

//# sourceMappingURL=ResultMetadata.js.map
