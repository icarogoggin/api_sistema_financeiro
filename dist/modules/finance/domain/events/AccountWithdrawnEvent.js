"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountWithdrawnEvent = void 0;
class AccountWithdrawnEvent {
    dateTimeOccurred;
    accountId;
    amount;
    constructor(accountId, amount) {
        this.dateTimeOccurred = new Date();
        this.accountId = accountId;
        this.amount = amount;
    }
    getAggregateId() {
        return this.accountId;
    }
}
exports.AccountWithdrawnEvent = AccountWithdrawnEvent;
//# sourceMappingURL=AccountWithdrawnEvent.js.map