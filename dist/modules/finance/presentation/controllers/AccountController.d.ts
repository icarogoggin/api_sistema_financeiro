import { CreateAccountUseCase } from '../../application/use-cases/CreateAccountUseCase';
import { TransferFundsUseCase } from '../../application/use-cases/TransferFundsUseCase';
import { CreateAccountDto } from '../../application/dtos/CreateAccountDto';
import { TransferFundsDto } from '../../application/dtos/TransferFundsDto';
import type { Response } from 'express';
export declare class AccountController {
    private readonly createAccountUseCase;
    private readonly transferFundsUseCase;
    constructor(createAccountUseCase: CreateAccountUseCase, transferFundsUseCase: TransferFundsUseCase);
    create(dto: CreateAccountDto, res: Response): Promise<Response<any, Record<string, any>>>;
    transfer(dto: TransferFundsDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
