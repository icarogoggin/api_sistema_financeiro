
import { Module } from '@nestjs/common';
import { AccountController } from './presentation/controllers/AccountController';
import { CreateAccountUseCase } from './application/use-cases/CreateAccountUseCase';
import { TransferFundsUseCase } from './application/use-cases/TransferFundsUseCase';
import { PrismaAccountRepository } from './infrastructure/persistence/prisma/repositories/PrismaAccountRepository';
import { PrismaService } from './infrastructure/persistence/prisma/prisma.service';

@Module({
    controllers: [AccountController],
    providers: [
        CreateAccountUseCase,
        TransferFundsUseCase,
        PrismaService,
        {
            provide: 'IAccountRepository',
            useClass: PrismaAccountRepository,
        },
    ],
})
export class FinanceModule { }
