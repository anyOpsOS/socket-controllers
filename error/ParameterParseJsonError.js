"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Caused when user parameter is given, but is invalid and cannot be parsed.
 */
class ParameterParseJsonError extends Error {
    constructor(value) {
        super("Parameter is invalid. Value (" + JSON.stringify(value) + ") cannot be parsed to JSON");
        this.name = "ParameterParseJsonError";
        this.stack = new Error().stack;
    }
}
exports.ParameterParseJsonError = ParameterParseJsonError;

//# sourceMappingURL=ParameterParseJsonError.js.map
