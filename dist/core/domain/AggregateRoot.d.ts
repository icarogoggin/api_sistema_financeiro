import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
export declare abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents;
    get domainEvents(): IDomainEvent[];
    protected addDomainEvent(domainEvent: IDomainEvent): void;
    clearEvents(): void;
    private logDomainEventAdded;
}
