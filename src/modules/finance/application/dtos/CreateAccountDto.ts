import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
    @ApiProperty({ description: 'The name of the account holder', example: 'John Doe' })
    name: string;

    @ApiProperty({ description: 'Initial balance in cents', example: 1000 })
    initialBalance: number;

    @ApiProperty({ description: 'Currency code (ISO 4217)', example: 'BRL' })
    currency: string;

    @ApiProperty({ description: 'Whether overdraft is allowed', example: false })
    allowOverdraft: boolean;
}
