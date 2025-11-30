
import { Inject, Injectable } from '@nestjs/common';
import type { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import { TransferFundsDto } from '../dtos/TransferFundsDto';
import { Result } from '../../../../core/logic/Result';
import { Money } from '../../domain/value-objects/Money.vo';

@Injectable()
export class TransferFundsUseCase {
    constructor(
        @Inject('IAccountRepository') private readonly accountRepo: IAccountRepository,
        // @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager // Assuming we have this provider
    ) { }

    async execute(dto: TransferFundsDto): Promise<Result<void>> {
        // Transaction logic should be here, but for now we just execute sequentially.
        // Ideally we wrap this in transactionManager.run(() => { ... })

        const from = await this.accountRepo.findById(dto.fromId);
        if (!from) return Result.fail(`Account ${dto.fromId} not found`);

        const to = await this.accountRepo.findById(dto.toId);
        if (!to) return Result.fail(`Account ${dto.toId} not found`);

        const amountOrError = Money.create(dto.amount, dto.currency);
        if (amountOrError.isFailure) return Result.fail(amountOrError.error);
        const amount = amountOrError.getValue();

        const withdrawResult = from.withdraw(amount);
        if (withdrawResult.isFailure) return Result.fail(withdrawResult.error);

        const depositResult = to.deposit(amount);
        if (depositResult.isFailure) return Result.fail(depositResult.error);

        await this.accountRepo.save(from);
        await this.accountRepo.save(to);

        return Result.ok();
    }
}
