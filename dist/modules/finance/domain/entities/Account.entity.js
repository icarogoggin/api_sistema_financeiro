"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const AggregateRoot_1 = require("../../../../core/domain/AggregateRoot");
const Result_1 = require("../../../../core/logic/Result");
const AccountInactiveException_1 = require("../exceptions/AccountInactiveException");
const InsufficientFundsException_1 = require("../exceptions/InsufficientFundsException");
const AccountWithdrawnEvent_1 = require("../events/AccountWithdrawnEvent");
class Account extends AggregateRoot_1.AggregateRoot {
    get balance() {
        return this.props.balance;
    }
    get status() {
        return this.props.status;
    }
    get allowOverdraft() {
        return this.props.allowOverdraft;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const account = new Account(props, id);
        return Result_1.Result.ok(account);
    }
    withdraw(amount) {
        if (this.props.status !== 'ACTIVE') {
            return Result_1.Result.fail(new AccountInactiveException_1.AccountInactiveException().message);
        }
        const newBalanceResult = this.props.balance.subtract(amount);
        if (newBalanceResult.isFailure) {
            return Result_1.Result.fail(newBalanceResult.error);
        }
        const newBalance = newBalanceResult.getValue();
        if (newBalance.isNegative() && !this.props.allowOverdraft) {
            return Result_1.Result.fail(new InsufficientFundsException_1.InsufficientFundsException().message);
        }
        this.props.balance = newBalance;
        this.addDomainEvent(new AccountWithdrawnEvent_1.AccountWithdrawnEvent(this._id, amount));
        return Result_1.Result.ok();
    }
    deposit(amount) {
        const newBalanceResult = this.props.balance.add(amount);
        if (newBalanceResult.isFailure)
            return Result_1.Result.fail(newBalanceResult.error);
        this.props.balance = newBalanceResult.getValue();
        return Result_1.Result.ok();
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.entity.js.map