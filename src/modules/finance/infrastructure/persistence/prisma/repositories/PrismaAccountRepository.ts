
import { Injectable } from '@nestjs/common';
import { IAccountRepository } from '../../../../domain/repositories/IAccountRepository';
import { Account } from '../../../../domain/entities/Account.entity';
import { PrismaService } from './prisma.service';
import { AccountMapper } from './mappers/AccountMapper';

@Injectable()
export class PrismaAccountRepository implements IAccountRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Account | null> {
        const raw = await this.prisma.account.findUnique({
            where: { id },
            include: { entries: true },
        });

        if (!raw) return null;

        return AccountMapper.toDomain(raw);
    }

    async save(account: Account): Promise<void> {
        const data = AccountMapper.toPersistence(account);

        await this.prisma.account.upsert({
            where: { id: data.id },
            update: data,
            create: data,
        });

        // Note: We are not saving LedgerEntries here yet because the Use Case should handle it via a separate repository or transaction,
        // or we should map events to LedgerEntries.
        // For now, we only persist the Account state (including balance snapshot).
    }
}
