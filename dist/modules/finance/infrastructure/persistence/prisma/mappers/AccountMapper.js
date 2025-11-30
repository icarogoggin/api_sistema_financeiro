"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMapper = void 0;
const Account_entity_1 = require("../../../../domain/entities/Account.entity");
const Money_vo_1 = require("../../../../domain/value-objects/Money.vo");
class AccountMapper {
    static toDomain(raw) {
        const balanceAmount = raw.entries.reduce((acc, entry) => acc + entry.amount, 0);
        const balanceOrError = Money_vo_1.Money.create(balanceAmount, 'BRL');
        if (balanceOrError.isFailure) {
            throw new Error(`Invalid balance for account ${raw.id}: ${balanceOrError.error}`);
        }
        const accountOrError = Account_entity_1.Account.create({
            balance: balanceOrError.getValue(),
            status: raw.status,
            allowOverdraft: raw.allowOverdraft,
        }, raw.id);
        if (accountOrError.isFailure) {
            throw new Error(`Failed to map account ${raw.id}: ${accountOrError.error}`);
        }
        return accountOrError.getValue();
    }
    static toPersistence(account) {
        return {
            id: account.id,
            name: 'Unknown',
            type: 'ASSET',
            status: account.status,
            allowOverdraft: account.allowOverdraft,
            balance: account.balance.amount,
        };
    }
}
exports.AccountMapper = AccountMapper;
//# sourceMappingURL=AccountMapper.js.map