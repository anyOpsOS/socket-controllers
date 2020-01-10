/**
 * Used in conjunction with @EmitOnSuccess and @EmitOnFail decorators.
 * If result returned by controller action is null or undefined then messages will not be emitted by @EmitOnSuccess
 * or @EmitOnFail decorators.
 */
export declare function SkipEmitOnEmptyResult(): Function;
