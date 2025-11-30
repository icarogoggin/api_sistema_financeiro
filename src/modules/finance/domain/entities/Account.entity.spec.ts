
import { Account } from './Account.entity';
import { Money } from '../value-objects/Money.vo';

describe('Account Entity', () => {
    it('should create a valid account', () => {
        const balance = Money.create(0, 'BRL').getValue();
        const accountOrError = Account.create({
            balance,
            status: 'ACTIVE',
            allowOverdraft: false,
        });
        expect(accountOrError.isSuccess).toBe(true);
        const account = accountOrError.getValue();
        expect(account.balance.amount).toBe(0);
    });

    it('should deposit money correctly', () => {
        const balance = Money.create(0, 'BRL').getValue();
        const account = Account.create({
            balance,
            status: 'ACTIVE',
            allowOverdraft: false,
        }).getValue();

        const depositAmount = Money.create(1000, 'BRL').getValue();
        const result = account.deposit(depositAmount);

        expect(result.isSuccess).toBe(true);
        expect(account.balance.amount).toBe(1000);
    });

    it('should withdraw money correctly', () => {
        const balance = Money.create(2000, 'BRL').getValue();
        const account = Account.create({
            balance,
            status: 'ACTIVE',
            allowOverdraft: false,
        }).getValue();

        const withdrawAmount = Money.create(1000, 'BRL').getValue();
        const result = account.withdraw(withdrawAmount);

        expect(result.isSuccess).toBe(true);
        expect(account.balance.amount).toBe(1000);
    });

    it('should fail to withdraw insufficient funds without overdraft', () => {
        const balance = Money.create(500, 'BRL').getValue();
        const account = Account.create({
            balance,
            status: 'ACTIVE',
            allowOverdraft: false,
        }).getValue();

        const withdrawAmount = Money.create(1000, 'BRL').getValue();
        const result = account.withdraw(withdrawAmount);

        expect(result.isFailure).toBe(true);
        expect(account.balance.amount).toBe(500);
    });

    it('should allow withdraw insufficient funds with overdraft', () => {
        const balance = Money.create(500, 'BRL').getValue();
        const account = Account.create({
            balance,
            status: 'ACTIVE',
            allowOverdraft: true,
        }).getValue();

        const withdrawAmount = Money.create(1000, 'BRL').getValue();
        const result = account.withdraw(withdrawAmount);

        expect(result.isSuccess).toBe(true);
        expect(account.balance.amount).toBe(-500);
    });
});
