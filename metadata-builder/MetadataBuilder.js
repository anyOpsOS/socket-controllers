"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const ControllerMetadata_1 = require("../metadata/ControllerMetadata");
const ActionMetadata_1 = require("../metadata/ActionMetadata");
const ParamMetadata_1 = require("../metadata/ParamMetadata");
const MiddlewareMetadata_1 = require("../metadata/MiddlewareMetadata");
const ResultMetadata_1 = require("../metadata/ResultMetadata");
const UseMetadata_1 = require("../metadata/UseMetadata");
/**
 * Builds metadata from the given metadata arguments.
 */
class MetadataBuilder {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    buildControllerMetadata(classes) {
        return this.createControllers(classes);
    }
    buildMiddlewareMetadata(classes) {
        return this.createMiddlewares(classes);
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    createMiddlewares(classes) {
        const storage = index_1.defaultMetadataArgsStorage();
        const middlewares = !classes ? storage.middlewares : storage.findMiddlewareMetadatasForClasses(classes);
        return middlewares.map(middlewareArgs => {
            return new MiddlewareMetadata_1.MiddlewareMetadata(middlewareArgs);
        });
    }
    createControllers(classes) {
        const storage = index_1.defaultMetadataArgsStorage();
        const controllers = !classes ? storage.controllers : storage.findControllerMetadatasForClasses(classes);
        return controllers.map(controllerArgs => {
            const controller = new ControllerMetadata_1.ControllerMetadata(controllerArgs);
            controller.actions = this.createActions(controller);
            controller.uses = this.createControllerUses(controller);
            return controller;
        });
    }
    createActions(controller) {
        return index_1.defaultMetadataArgsStorage()
            .findActionsWithTarget(controller.target)
            .map(actionArgs => {
            const action = new ActionMetadata_1.ActionMetadata(controller, actionArgs);
            action.params = this.createParams(action);
            action.results = this.createResults(action);
            return action;
        });
    }
    /**
     * Creates use metadatas for controllers.
     */
    createControllerUses(controller) {
        return index_1.defaultMetadataArgsStorage()
            .filterUsesWithTarget(controller.target)
            .map(useArgs => new UseMetadata_1.UseMetadata(useArgs));
    }
    createParams(action) {
        return index_1.defaultMetadataArgsStorage()
            .findParamsWithTargetAndMethod(action.target, action.method)
            .map(paramArgs => new ParamMetadata_1.ParamMetadata(action, paramArgs));
    }
    createResults(action) {
        return index_1.defaultMetadataArgsStorage()
            .findResutlsWithTargetAndMethod(action.target, action.method)
            .map(resultArgs => new ResultMetadata_1.ResultMetadata(action, resultArgs));
    }
}
exports.MetadataBuilder = MetadataBuilder;

//# sourceMappingURL=MetadataBuilder.js.map
