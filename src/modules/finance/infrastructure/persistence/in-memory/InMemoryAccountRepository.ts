
import { IAccountRepository } from '../../../domain/repositories/IAccountRepository';
import { Account } from '../../../domain/entities/Account.entity';

export class InMemoryAccountRepository implements IAccountRepository {
    public accounts: Map<string, Account> = new Map();

    async findById(id: string): Promise<Account | null> {
        const account = this.accounts.get(id);
        return account ? account : null;
    }

    async save(account: Account): Promise<void> {
        this.accounts.set(account.id, account);
    }
}
