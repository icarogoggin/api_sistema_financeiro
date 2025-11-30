import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
interface MoneyProps {
    amount: number;
    currency: string;
}
export declare class Money extends ValueObject<MoneyProps> {
    private constructor();
    get amount(): number;
    get currency(): string;
    static create(amount: number, currency: string): Result<Money>;
    add(other: Money): Result<Money>;
    subtract(other: Money): Result<Money>;
    isNegative(): boolean;
    isZero(): boolean;
}
export {};
