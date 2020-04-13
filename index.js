"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const MetadataArgsStorage_1 = require("./metadata-builder/MetadataArgsStorage");
const DirectoryExportedClassesLoader_1 = require("./util/DirectoryExportedClassesLoader");
const SocketControllerExecutor_1 = require("./SocketControllerExecutor");
// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------
/**
 * Registers all loaded actions in your express application.
 */
async function useSocketServer(io, options) {
    await createExecutor(io, options || {});
    return io;
}
exports.useSocketServer = useSocketServer;
/**
 * Registers all loaded actions in your express application.
 */
async function createSocketServer(port, options) {
    const io = require("socket.io")(port);
    await createExecutor(io, options || {});
    return io;
}
exports.createSocketServer = createSocketServer;
/**
 * Registers all loaded actions in your express application.
 */
async function createExecutor(io, options) {
    const executor = new SocketControllerExecutor_1.SocketControllerExecutor(io);
    // second import all controllers and middlewares and error handlers
    let controllerClasses;
    if (options && options.controllers && options.controllers.length)
        controllerClasses = options.controllers.filter(controller => controller instanceof Function);
    const controllerDirs = options.controllers.filter(controller => typeof controller === "string");
    controllerClasses.push(...await DirectoryExportedClassesLoader_1.importClassesFromDirectories(controllerDirs));
    let middlewareClasses;
    if (options && options.middlewares && options.middlewares.length) {
        middlewareClasses = options.middlewares.filter(controller => controller instanceof Function);
        const middlewareDirs = options.middlewares.filter(controller => typeof controller === "string");
        middlewareClasses.push(...await DirectoryExportedClassesLoader_1.importClassesFromDirectories(middlewareDirs));
    }
    if (options.useClassTransformer !== undefined) {
        executor.useClassTransformer = options.useClassTransformer;
    }
    else {
        executor.useClassTransformer = true;
    }
    executor.classToPlainTransformOptions = options.classToPlainTransformOptions;
    executor.plainToClassTransformOptions = options.plainToClassTransformOptions;
    // run socket controller register and other operations
    executor.execute(controllerClasses, middlewareClasses);
}
// -------------------------------------------------------------------------
// Global Metadata Storage
// -------------------------------------------------------------------------
/**
 * Gets the metadata arguments storage.
 */
function defaultMetadataArgsStorage() {
    if (!global.socketControllersMetadataArgsStorage)
        global.socketControllersMetadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
    return global.socketControllersMetadataArgsStorage;
}
exports.defaultMetadataArgsStorage = defaultMetadataArgsStorage;
// -------------------------------------------------------------------------
// Commonly Used exports
// -------------------------------------------------------------------------
__export(require("./container"));
__export(require("./decorators"));

//# sourceMappingURL=index.js.map
