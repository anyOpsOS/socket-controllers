"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResultTypes_1 = require("./types/ResultTypes");
class ActionMetadata {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(controllerMetadata, args) {
        this.controllerMetadata = controllerMetadata;
        this.name = args.name;
        this.target = args.target;
        this.method = args.method;
        this.type = args.type;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    executeAction(params) {
        return this.controllerMetadata.instance[this.method].apply(this.controllerMetadata.instance, params);
    }
    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------
    get emitOnSuccess() {
        return this.results.find(resultHandler => resultHandler.type === ResultTypes_1.ResultTypes.EMIT_ON_SUCCESS);
    }
    get emitOnFail() {
        return this.results.find(resultHandler => resultHandler.type === ResultTypes_1.ResultTypes.EMIT_ON_FAIL);
    }
    get skipEmitOnEmptyResult() {
        return this.results.find(resultHandler => resultHandler.type === ResultTypes_1.ResultTypes.SKIP_EMIT_ON_EMPTY_RESULT);
    }
    get returnAck() {
        return this.results.find(resultHandler => resultHandler.type === ResultTypes_1.ResultTypes.RETURN_ACK);
    }
}
exports.ActionMetadata = ActionMetadata;

//# sourceMappingURL=ActionMetadata.js.map
