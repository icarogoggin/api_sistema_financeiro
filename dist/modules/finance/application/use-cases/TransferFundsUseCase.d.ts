import type { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import { TransferFundsDto } from '../dtos/TransferFundsDto';
import { Result } from '../../../../core/logic/Result';
export declare class TransferFundsUseCase {
    private readonly accountRepo;
    constructor(accountRepo: IAccountRepository);
    execute(dto: TransferFundsDto): Promise<Result<void>>;
}
