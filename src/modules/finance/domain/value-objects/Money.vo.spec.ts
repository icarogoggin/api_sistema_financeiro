
import { Money } from './Money.vo';

describe('Money Value Object', () => {
    it('should create a valid money instance', () => {
        const moneyOrError = Money.create(1000, 'BRL');
        expect(moneyOrError.isSuccess).toBe(true);
        const money = moneyOrError.getValue();
        expect(money.amount).toBe(1000);
        expect(money.currency).toBe('BRL');
    });

    it('should fail to create money with non-integer amount', () => {
        const moneyOrError = Money.create(10.5, 'BRL');
        expect(moneyOrError.isFailure).toBe(true);
    });

    it('should fail to create money with invalid currency', () => {
        const moneyOrError = Money.create(1000, 'BR');
        expect(moneyOrError.isFailure).toBe(true);
    });

    it('should add two money instances correctly', () => {
        const m1 = Money.create(1000, 'BRL').getValue();
        const m2 = Money.create(500, 'BRL').getValue();
        const result = m1.add(m2);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(1500);
    });

    it('should fail to add money with different currencies', () => {
        const m1 = Money.create(1000, 'BRL').getValue();
        const m2 = Money.create(500, 'USD').getValue();
        const result = m1.add(m2);
        expect(result.isFailure).toBe(true);
    });

    it('should subtract two money instances correctly', () => {
        const m1 = Money.create(1000, 'BRL').getValue();
        const m2 = Money.create(500, 'BRL').getValue();
        const result = m1.subtract(m2);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(500);
    });
});
