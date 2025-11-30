export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: T | string;
    private _value;
    constructor(isSuccess: boolean, error?: T | string, value?: T);
    getValue(): T;
    errorValue(): T;
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: any): Result<U>;
    static combine(results: Result<any>[]): Result<any>;
}
