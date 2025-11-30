"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const ValueObject_1 = require("../../../../core/domain/ValueObject");
const Result_1 = require("../../../../core/logic/Result");
class Money extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get amount() {
        return this.props.amount;
    }
    get currency() {
        return this.props.currency;
    }
    static create(amount, currency) {
        if (!Number.isInteger(amount)) {
            return Result_1.Result.fail("Amount must be an integer in minor units (e.g., cents)");
        }
        if (!currency || currency.length !== 3) {
            return Result_1.Result.fail("Currency must be a valid 3-letter code");
        }
        return Result_1.Result.ok(new Money({ amount, currency }));
    }
    add(other) {
        if (this.props.currency !== other.props.currency) {
            return Result_1.Result.fail("Cannot add money with different currencies");
        }
        return Money.create(this.props.amount + other.props.amount, this.props.currency);
    }
    subtract(other) {
        if (this.props.currency !== other.props.currency) {
            return Result_1.Result.fail("Cannot subtract money with different currencies");
        }
        return Money.create(this.props.amount - other.props.amount, this.props.currency);
    }
    isNegative() {
        return this.props.amount < 0;
    }
    isZero() {
        return this.props.amount === 0;
    }
}
exports.Money = Money;
//# sourceMappingURL=Money.vo.js.map