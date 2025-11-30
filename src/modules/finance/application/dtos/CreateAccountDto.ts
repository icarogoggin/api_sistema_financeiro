
export interface CreateAccountDto {
    name: string; // Not used in entity yet but good for future
    initialBalance: number; // Integer cents
    currency: string;
    allowOverdraft: boolean;
}
