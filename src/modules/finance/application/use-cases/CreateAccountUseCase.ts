
import { Inject, Injectable } from '@nestjs/common';
import type { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import { CreateAccountDto } from '../dtos/CreateAccountDto';
import { Result } from '../../../../core/logic/Result';
import { Money } from '../../domain/value-objects/Money.vo';
import { Account } from '../../domain/entities/Account.entity';

@Injectable()
export class CreateAccountUseCase {
    constructor(
        @Inject('IAccountRepository') private readonly accountRepo: IAccountRepository,
    ) { }

    async execute(dto: CreateAccountDto): Promise<Result<string>> {
        const balanceOrError = Money.create(dto.initialBalance, dto.currency);
        if (balanceOrError.isFailure) return Result.fail<string>(balanceOrError.error);
        const balance = balanceOrError.getValue();

        const accountOrError = Account.create({
            balance: balance,
            status: 'ACTIVE',
            allowOverdraft: dto.allowOverdraft,
        });

        if (accountOrError.isFailure) return Result.fail<string>(accountOrError.error);
        const account = accountOrError.getValue();

        await this.accountRepo.save(account);

        return Result.ok<string>(account.id);
    }
}
