"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Storage all metadatas read from decorators.
 */
class MetadataArgsStorage {
    constructor() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.controllers = [];
        this.middlewares = [];
        this.uses = [];
        this.actions = [];
        this.results = [];
        this.params = [];
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    findControllerMetadatasForClasses(classes) {
        return this.controllers.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }
    findMiddlewareMetadatasForClasses(classes) {
        return this.middlewares.filter(middleware => {
            return classes.filter(cls => middleware.target === cls).length > 0;
        });
    }
    findActionsWithTarget(target) {
        return this.actions.filter(action => action.target === target);
    }
    filterUsesWithTarget(target) {
        return this.uses.filter(use => {
            return use.target === target;
        });
    }
    findResutlsWithTargetAndMethod(target, methodName) {
        return this.results.filter(result => {
            return result.target === target && result.method === methodName;
        });
    }
    findParamsWithTargetAndMethod(target, methodName) {
        return this.params.filter(param => {
            return param.target === target && param.method === methodName;
        });
    }
    /**
     * Removes all saved metadata.
     */
    reset() {
        this.controllers = [];
        this.middlewares = [];
        this.actions = [];
        this.params = [];
    }
}
exports.MetadataArgsStorage = MetadataArgsStorage;

//# sourceMappingURL=MetadataArgsStorage.js.map
