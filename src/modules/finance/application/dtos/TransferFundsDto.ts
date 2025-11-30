
export interface TransferFundsDto {
    fromId: string;
    toId: string;
    amount: number; // Integer cents
    currency: string;
}
