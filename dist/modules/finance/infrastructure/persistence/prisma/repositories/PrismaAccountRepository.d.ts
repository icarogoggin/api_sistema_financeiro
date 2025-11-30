import { IAccountRepository } from '../../../../domain/repositories/IAccountRepository';
import { Account } from '../../../../domain/entities/Account.entity';
import { PrismaService } from '../prisma.service';
export declare class PrismaAccountRepository implements IAccountRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Account | null>;
    save(account: Account): Promise<void>;
}
