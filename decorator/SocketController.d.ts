/**
 * Registers a class to be a socket controller that can listen to websocket events and respond to them.
 *
 * @param namespace Namespace in which this controller's events will be registered.
 */
export declare function SocketController(namespace?: string | RegExp): Function;
