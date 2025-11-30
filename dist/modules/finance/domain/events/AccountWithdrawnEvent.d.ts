import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent";
import { Money } from "../value-objects/Money.vo";
export declare class AccountWithdrawnEvent implements IDomainEvent {
    dateTimeOccurred: Date;
    accountId: string;
    amount: Money;
    constructor(accountId: string, amount: Money);
    getAggregateId(): string;
}
