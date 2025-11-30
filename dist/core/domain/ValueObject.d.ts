interface ValueObjectProps {
    [index: string]: any;
}
export declare abstract class ValueObject<T extends ValueObjectProps> {
    readonly props: T;
    constructor(props: T);
    equals(vo?: ValueObject<T>): boolean;
}
export {};
