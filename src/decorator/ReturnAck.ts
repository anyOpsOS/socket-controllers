import {ResultMetadataArgs} from "../metadata/args/ResultMetadataArgs";
import {ResultTypes} from "../metadata/types/ResultTypes";
import {defaultMetadataArgsStorage} from "../index";

/**
 * Used in conjunction with @OnMessage decorator.
 * If result returned by controller then messages will be emitted as a callback.
 */
export function ReturnAck(): Function {
    return function (object: Object, methodName: string) {
        const metadata: ResultMetadataArgs = {
            target: object.constructor,
            method: methodName,
            type: ResultTypes.RETURN_ACK
        };
        defaultMetadataArgsStorage().results.push(metadata);
    };
}