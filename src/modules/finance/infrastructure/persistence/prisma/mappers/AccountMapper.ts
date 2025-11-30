
import { Account as PrismaAccount, LedgerEntry } from '@prisma/client';
import { Account } from '../../../../domain/entities/Account.entity';
import { Money } from '../../../../domain/value-objects/Money.vo';

type PrismaAccountWithEntries = PrismaAccount & {
    entries: LedgerEntry[];
};

export class AccountMapper {
    public static toDomain(raw: PrismaAccountWithEntries): Account {
        const balanceAmount = raw.entries.reduce((acc, entry) => acc + entry.amount, 0);
        const balanceOrError = Money.create(balanceAmount, 'BRL'); // Assuming BRL for now or store currency in Account

        if (balanceOrError.isFailure) {
            throw new Error(`Invalid balance for account ${raw.id}: ${balanceOrError.error}`);
        }

        const accountOrError = Account.create(
            {
                balance: balanceOrError.getValue(),
                status: raw.status as 'ACTIVE' | 'INACTIVE',
                allowOverdraft: raw.allowOverdraft,
            },
            raw.id,
        );

        if (accountOrError.isFailure) {
            throw new Error(`Failed to map account ${raw.id}: ${accountOrError.error}`);
        }

        return accountOrError.getValue();
    }

    public static toPersistence(account: Account): any {
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
