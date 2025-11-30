
export interface IDomainEvent {
    dateTimeOccurred: Date;
    getAggregateId(): string; // ou UniqueEntityID
}
