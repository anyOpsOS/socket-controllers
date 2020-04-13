"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParamMetadata {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(actionMetadata, args) {
        this.actionMetadata = actionMetadata;
        this.target = args.target;
        this.method = args.method;
        this.reflectedType = args.reflectedType;
        this.index = args.index;
        this.type = args.type;
        this.transform = args.transform;
        this.classTransformOptions = args.classTransformOptions;
        this.value = args.value;
    }
}
exports.ParamMetadata = ParamMetadata;

//# sourceMappingURL=ParamMetadata.js.map
