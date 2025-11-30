import { Account as PrismaAccount, LedgerEntry } from '@prisma/client';
import { Account } from '../../../../domain/entities/Account.entity';
type PrismaAccountWithEntries = PrismaAccount & {
    entries: LedgerEntry[];
};
export declare class AccountMapper {
    static toDomain(raw: PrismaAccountWithEntries): Account;
    static toPersistence(account: Account): any;
}
export {};
