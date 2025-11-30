
import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { Result } from "../../../../core/logic/Result";
import { Money } from "../value-objects/Money.vo";
import { AccountInactiveException } from "../exceptions/AccountInactiveException";
import { InsufficientFundsException } from "../exceptions/InsufficientFundsException";
import { AccountWithdrawnEvent } from "../events/AccountWithdrawnEvent";

interface AccountProps {
    balance: Money;
    status: 'ACTIVE' | 'INACTIVE';
    allowOverdraft: boolean;
}

export class Account extends AggregateRoot<AccountProps> {
    get balance(): Money {
        return this.props.balance;
    }

    get status(): 'ACTIVE' | 'INACTIVE' {
        return this.props.status;
    }

    get allowOverdraft(): boolean {
        return this.props.allowOverdraft;
    }

    private constructor(props: AccountProps, id?: string) {
        super(props, id);
    }

    public static create(props: AccountProps, id?: string): Result<Account> {
        const account = new Account(props, id);
        return Result.ok<Account>(account);
    }

    public withdraw(amount: Money): Result<void> {
        if (this.props.status !== 'ACTIVE') {
            return Result.fail(new AccountInactiveException().message);
        }

        const newBalanceResult = this.props.balance.subtract(amount);
        if (newBalanceResult.isFailure) {
            return Result.fail(newBalanceResult.error);
        }
        const newBalance = newBalanceResult.getValue();

        if (newBalance.isNegative() && !this.props.allowOverdraft) {
            return Result.fail(new InsufficientFundsException().message);
        }

        (this.props as any).balance = newBalance;
        this.addDomainEvent(new AccountWithdrawnEvent(this._id, amount));
        return Result.ok();
    }

    public deposit(amount: Money): Result<void> {
        const newBalanceResult = this.props.balance.add(amount);
        if (newBalanceResult.isFailure) return Result.fail(newBalanceResult.error);
        (this.props as any).balance = newBalanceResult.getValue();
        return Result.ok();
    }
}
