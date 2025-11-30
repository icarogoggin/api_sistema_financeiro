
import { InMemoryAccountRepository } from './src/modules/finance/infrastructure/persistence/in-memory/InMemoryAccountRepository';
import { CreateAccountUseCase } from './src/modules/finance/application/use-cases/CreateAccountUseCase';
import { TransferFundsUseCase } from './src/modules/finance/application/use-cases/TransferFundsUseCase';
import { CreateAccountDto } from './src/modules/finance/application/dtos/CreateAccountDto';
import { TransferFundsDto } from './src/modules/finance/application/dtos/TransferFundsDto';

async function runDemo() {
    console.log('\n==================================================');
    console.log('   DEMONSTRAÇÃO DO SISTEMA FINANCEIRO (IN-MEMORY)');
    console.log('==================================================\n');

    // 1. Setup
    const repo = new InMemoryAccountRepository();
    const createAccount = new CreateAccountUseCase(repo);
    const transferFunds = new TransferFundsUseCase(repo);

    // 2. Create Account 1 (Alice)
    console.log('[Demo] Creating Account for Alice (Initial Balance: R$ 100.00)...');
    const aliceDto: CreateAccountDto = {
        name: 'Alice',
        initialBalance: 10000, // 10000 centavos = R$ 100.00
        currency: 'BRL',
        allowOverdraft: false
    };

    const aliceResult = await createAccount.execute(aliceDto);
    if (aliceResult.isFailure) {
        console.error('[Demo] Error creating Alice account:', aliceResult.error);
        return;
    }
    const aliceId = aliceResult.getValue();
    console.log(`[Demo] Alice account created successfully. ID: ${aliceId}\n`);

    // 3. Create Account 2 (Bob)
    console.log('[Demo] Creating Account for Bob (Initial Balance: R$ 0.00)...');
    const bobDto: CreateAccountDto = {
        name: 'Bob',
        initialBalance: 0,
        currency: 'BRL',
        allowOverdraft: false
    };

    const bobResult = await createAccount.execute(bobDto);
    if (bobResult.isFailure) {
        console.error('[Demo] Error creating Bob account:', bobResult.error);
        return;
    }
    const bobId = bobResult.getValue();
    console.log(`[Demo] Bob account created successfully. ID: ${bobId}\n`);

    // 4. Transfer Funds (Alice -> Bob)
    console.log('[Demo] Transferring R$ 50.00 from Alice to Bob...');
    const transferDto: TransferFundsDto = {
        fromId: aliceId,
        toId: bobId,
        amount: 5000, // 5000 centavos = R$ 50.00
        currency: 'BRL'
    };

    const transferResult = await transferFunds.execute(transferDto);
    if (transferResult.isFailure) {
        console.error('[Demo] Transfer failed:', transferResult.error);
        return;
    }
    console.log('[Demo] Transfer successful.\n');

    // 5. Verify Final Balances
    console.log('[Demo] Verifying Final Balances...');
    const aliceAccount = await repo.findById(aliceId);
    const bobAccount = await repo.findById(bobId);

    if (aliceAccount && bobAccount) {
        console.log(`[Demo] Alice Final Balance: R$ ${(aliceAccount.balance.amount / 100).toFixed(2)}`);
        console.log(`[Demo] Bob Final Balance:   R$ ${(bobAccount.balance.amount / 100).toFixed(2)}`);
    } else {
        console.error('[Demo] Error retrieving accounts.');
    }

    console.log('\n==================================================');
    console.log('             FIM DA DEMONSTRAÇÃO');
    console.log('==================================================\n');
}

runDemo().catch(console.error);
