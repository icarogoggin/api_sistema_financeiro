import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountUseCase } from '../../application/use-cases/CreateAccountUseCase';
import { TransferFundsUseCase } from '../../application/use-cases/TransferFundsUseCase';
import { CreateAccountDto } from '../../application/dtos/CreateAccountDto';
import { TransferFundsDto } from '../../application/dtos/TransferFundsDto';
import type { Response } from 'express';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
    constructor(
        private readonly createAccountUseCase: CreateAccountUseCase,
        private readonly transferFundsUseCase: TransferFundsUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new account' })
    @ApiResponse({ status: 201, description: 'The account has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() dto: CreateAccountDto, @Res() res: Response) {
        const result = await this.createAccountUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(HttpStatus.CREATED).send();
    }

    @Post('transfer')
    @ApiOperation({ summary: 'Transfer funds between accounts' })
    @ApiResponse({ status: 200, description: 'Funds transferred successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input or insufficient funds.' })
    async transfer(@Body() dto: TransferFundsDto, @Res() res: Response) {
        const result = await this.transferFundsUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(HttpStatus.OK).send();
    }
}
