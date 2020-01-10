"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataArgsStorage_1 = require("./metadata-builder/MetadataArgsStorage");
var DirectoryExportedClassesLoader_1 = require("./util/DirectoryExportedClassesLoader");
var SocketControllerExecutor_1 = require("./SocketControllerExecutor");
var container_1 = require("./container");
// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------
/**
 * Registers all loaded actions in your express application.
 */
function useSocketServer(io, options) {
    createExecutor(io, options || {});
    return io;
}
exports.useSocketServer = useSocketServer;
/**
 * Registers all loaded actions in your express application.
 */
function createSocketServer(port, options) {
    var io = require("socket.io")(port);
    createExecutor(io, options || {});
    return io;
}
exports.createSocketServer = createSocketServer;
/**
 * Gets socket.io instance
 */
function getSocketIO() {
    return getSocketExecutor().io;
}
exports.getSocketIO = getSocketIO;
/**
 * Get socket executor
 */
function getSocketExecutor() {
    return container_1.getFromContainer(SocketControllerExecutor_1.SocketControllerExecutor);
}
/**
 * Registers all loaded actions in your express application.
 */
function createExecutor(io, options) {
    // second import all controllers and middlewares and error handlers
    var controllerClasses;
    if (options && options.controllers && options.controllers.length)
        controllerClasses = options.controllers.filter(function (controller) { return controller instanceof Function; });
    var controllerDirs = options.controllers.filter(function (controller) { return typeof controller === "string"; });
    controllerClasses.push.apply(controllerClasses, DirectoryExportedClassesLoader_1.importClassesFromDirectories(controllerDirs));
    var middlewareClasses;
    if (options && options.middlewares && options.middlewares.length) {
        middlewareClasses = options.middlewares.filter(function (controller) { return controller instanceof Function; });
        var middlewareDirs = options.middlewares.filter(function (controller) { return typeof controller === "string"; });
        middlewareClasses.push.apply(middlewareClasses, DirectoryExportedClassesLoader_1.importClassesFromDirectories(middlewareDirs));
    }
    // run socket controller register and other operations
    getSocketExecutor()
        .init(io, options)
        .execute(controllerClasses, middlewareClasses);
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
// decorators
__export(require("./decorator/SocketController"));
__export(require("./decorator/SocketIO"));
__export(require("./decorator/SocketId"));
__export(require("./decorator/SocketRequest"));
__export(require("./decorator/SocketRooms"));
__export(require("./decorator/SocketQueryParam"));
__export(require("./decorator/SocketSessionParam"));
__export(require("./decorator/ConnectedSocket"));
__export(require("./decorator/OnConnect"));
__export(require("./decorator/OnDisconnect"));
__export(require("./decorator/OnMessage"));
__export(require("./decorator/EmitOnSuccess"));
__export(require("./decorator/EmitOnFail"));
__export(require("./decorator/SkipEmitOnEmptyResult"));
__export(require("./decorator/ReturnAck"));
__export(require("./decorator/Middleware"));
__export(require("./decorator/MessageBody"));
__export(require("./decorator/NspParams"));
__export(require("./decorator/NspParam"));

//# sourceMappingURL=index.js.map
