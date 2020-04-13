import { Socket } from "socket.io";
/**
 * Special function used to get currently authorized user.
 */
export declare type CurrentUserChecker = (socket: Socket) => Promise<any> | any;
