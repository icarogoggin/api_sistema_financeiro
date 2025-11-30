export declare abstract class Entity<T> {
    protected readonly _id: string;
    readonly props: T;
    constructor(props: T, id?: string);
    get id(): string;
    equals(object?: Entity<T>): boolean;
}
