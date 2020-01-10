/**
 * Action result handler type.
 */
export type ResultType = "emit-on-success"
    | "emit-on-fail"
    | "skip-emit-on-empty-result"
    | "return-ack";

/**
 * Static access to result handler types.
 */
export class ResultTypes {
    static EMIT_ON_SUCCESS: ResultType = "emit-on-success";
    static EMIT_ON_FAIL: ResultType = "emit-on-fail";
    static SKIP_EMIT_ON_EMPTY_RESULT: ResultType = "skip-emit-on-empty-result";
    static RETURN_ACK: ResultType = "return-ack";
}