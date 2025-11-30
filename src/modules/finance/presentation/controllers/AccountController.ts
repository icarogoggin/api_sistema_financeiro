
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccountUseCase';
import { TransferFundsUseCase } from '../../application/use-cases/TransferFundsUseCase';
import { CreateAccountDto } from '../../application/dtos/CreateAccountDto';
import { TransferFundsDto } from '../../application/dtos/TransferFundsDto';
import type { Response } from 'express';

@Controller('accounts')
export class AccountController {
    constructor(
        private readonly createAccountUseCase: CreateAccountUseCase,
        private readonly transferFundsUseCase: TransferFundsUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CreateAccountDto, @Res() res: Response) {
        const result = await this.createAccountUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(HttpStatus.CREATED).send();
    }

    @Post('transfer')
    async transfer(@Body() dto: TransferFundsDto, @Res() res: Response) {
        const result = await this.transferFundsUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(HttpStatus.OK).send();
    }
}
