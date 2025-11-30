import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { Result } from "../../../../core/logic/Result";
import { Money } from "../value-objects/Money.vo";
interface AccountProps {
    balance: Money;
    status: 'ACTIVE' | 'INACTIVE';
    allowOverdraft: boolean;
}
export declare class Account extends AggregateRoot<AccountProps> {
    get balance(): Money;
    get status(): 'ACTIVE' | 'INACTIVE';
    get allowOverdraft(): boolean;
    private constructor();
    static create(props: AccountProps, id?: string): Result<Account>;
    withdraw(amount: Money): Result<void>;
    deposit(amount: Money): Result<void>;
}
export {};
