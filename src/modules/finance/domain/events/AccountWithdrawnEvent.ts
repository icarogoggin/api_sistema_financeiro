
import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent";
import { Money } from "../value-objects/Money.vo";

export class AccountWithdrawnEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public accountId: string;
    public amount: Money;

    constructor(accountId: string, amount: Money) {
        this.dateTimeOccurred = new Date();
        this.accountId = accountId;
        this.amount = amount;
    }

    getAggregateId(): string {
        return this.accountId;
    }
}
