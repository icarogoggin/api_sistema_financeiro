import type { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import { CreateAccountDto } from '../dtos/CreateAccountDto';
import { Result } from '../../../../core/logic/Result';
export declare class CreateAccountUseCase {
    private readonly accountRepo;
    constructor(accountRepo: IAccountRepository);
    execute(dto: CreateAccountDto): Promise<Result<void>>;
}
