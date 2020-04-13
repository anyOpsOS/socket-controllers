import { MetadataArgsStorage } from "./metadata-builder/MetadataArgsStorage";
import { SocketControllersOptions } from "./SocketControllersOptions";
/**
 * Registers all loaded actions in your express application.
 */
export declare function useSocketServer<T>(io: T, options?: SocketControllersOptions): Promise<T>;
/**
 * Registers all loaded actions in your express application.
 */
export declare function createSocketServer(port: number, options?: SocketControllersOptions): Promise<any>;
/**
 * Gets socket.io instance
 */
export declare function getSocketIO(): any;
/**
 * Gets the metadata arguments storage.
 */
export declare function defaultMetadataArgsStorage(): MetadataArgsStorage;
export * from "./container";
export * from "./SocketControllersOptions";
export * from "./MiddlewareInterface";
export * from "./decorator/SocketController";
export * from "./decorator/SocketIO";
export * from "./decorator/SocketId";
export * from "./decorator/SocketRequest";
export * from "./decorator/SocketRooms";
export * from "./decorator/SocketQueryParam";
export * from "./decorator/SocketSessionParam";
export * from "./decorator/ConnectedSocket";
export * from "./decorator/OnConnect";
export * from "./decorator/OnDisconnect";
export * from "./decorator/OnMessage";
export * from "./decorator/EmitOnSuccess";
export * from "./decorator/EmitOnFail";
export * from "./decorator/SkipEmitOnEmptyResult";
export * from "./decorator/ReturnAck";
export * from "./decorator/Middleware";
export * from "./decorator/MessageBody";
export * from "./decorator/NspParams";
export * from "./decorator/NspParam";
