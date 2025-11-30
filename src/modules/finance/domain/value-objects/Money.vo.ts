
import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";

interface MoneyProps {
    amount: number; // Integer (cents)
    currency: string;
}

export class Money extends ValueObject<MoneyProps> {
    private constructor(props: MoneyProps) {
        super(props);
    }

    get amount(): number {
        return this.props.amount;
    }

    get currency(): string {
        return this.props.currency;
    }

    public static create(amount: number, currency: string): Result<Money> {
        if (!Number.isInteger(amount)) {
            return Result.fail<Money>("Amount must be an integer in minor units (e.g., cents)");
        }
        if (!currency || currency.length !== 3) {
            return Result.fail<Money>("Currency must be a valid 3-letter code");
        }
        return Result.ok<Money>(new Money({ amount, currency }));
    }

    public add(other: Money): Result<Money> {
        if (this.props.currency !== other.props.currency) {
            return Result.fail<Money>("Cannot add money with different currencies");
        }
        return Money.create(this.props.amount + other.props.amount, this.props.currency);
    }

    public subtract(other: Money): Result<Money> {
        if (this.props.currency !== other.props.currency) {
            return Result.fail<Money>("Cannot subtract money with different currencies");
        }
        return Money.create(this.props.amount - other.props.amount, this.props.currency);
    }

    public isNegative(): boolean {
        return this.props.amount < 0;
    }

    public isZero(): boolean {
        return this.props.amount === 0;
    }
}
