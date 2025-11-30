import { Account } from "../entities/Account.entity";
export interface IAccountRepository {
    findById(id: string): Promise<Account | null>;
    save(account: Account): Promise<void>;
}
