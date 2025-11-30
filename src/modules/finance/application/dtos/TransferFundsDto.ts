import { ApiProperty } from '@nestjs/swagger';

export class TransferFundsDto {
    @ApiProperty({ description: 'ID of the source account' })
    fromId: string;

    @ApiProperty({ description: 'ID of the destination account' })
    toId: string;

    @ApiProperty({ description: 'Amount to transfer in cents', example: 500 })
    amount: number;

    @ApiProperty({ description: 'Currency code', example: 'BRL' })
    currency: string;
}
