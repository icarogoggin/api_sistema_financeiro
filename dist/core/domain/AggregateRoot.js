"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
class AggregateRoot extends Entity_1.Entity {
    _domainEvents = [];
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        this.logDomainEventAdded(domainEvent);
    }
    clearEvents() {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
    logDomainEventAdded(domainEvent) {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass?.constructor.name, '==>', domainEventClass?.constructor.name);
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map