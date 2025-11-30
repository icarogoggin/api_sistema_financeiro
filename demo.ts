
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

    // 2. Criar Conta 1 (Alice)
    console.log('>>> Passo 1: Criando Conta de Alice (Saldo Inicial: R$ 100,00)');
    const aliceDto: CreateAccountDto = {
        name: 'Alice',
        initialBalance: 10000, // 10000 centavos = R$ 100.00
        currency: 'BRL',
        allowOverdraft: false
    };

    const aliceResult = await createAccount.execute(aliceDto);
    if (aliceResult.isFailure) {
        console.error('Erro ao criar conta de Alice:', aliceResult.error);
        return;
    }
    const aliceId = aliceResult.getValue();
    console.log(`Conta de Alice criada com sucesso! ID: ${aliceId}\n`);

    // 3. Criar Conta 2 (Bob)
    console.log('>>> Passo 2: Criando Conta de Bob (Saldo Inicial: R$ 0,00)');
    const bobDto: CreateAccountDto = {
        name: 'Bob',
        initialBalance: 0,
        currency: 'BRL',
        allowOverdraft: false
    };

    const bobResult = await createAccount.execute(bobDto);
    if (bobResult.isFailure) {
        console.error('Erro ao criar conta de Bob:', bobResult.error);
        return;
    }
    const bobId = bobResult.getValue();
    console.log(`Conta de Bob criada com sucesso! ID: ${bobId}\n`);

    // 4. Transferir Fundos (Alice -> Bob)
    console.log('>>> Passo 3: Transferindo R$ 50,00 de Alice para Bob');
    const transferDto: TransferFundsDto = {
        fromId: aliceId,
        toId: bobId,
        amount: 5000, // 5000 centavos = R$ 50.00
        currency: 'BRL'
    };

    const transferResult = await transferFunds.execute(transferDto);
    if (transferResult.isFailure) {
        console.error('Erro na transferência:', transferResult.error);
        return;
    }
    console.log('Transferência realizada com sucesso!\n');

    // 5. Verificar Saldos Finais
    console.log('>>> Passo 4: Verificando Saldos Finais');
    const aliceAccount = await repo.findById(aliceId);
    const bobAccount = await repo.findById(bobId);

    if (aliceAccount && bobAccount) {
        console.log(`Saldo Final Alice: R$ ${(aliceAccount.balance.amount / 100).toFixed(2)}`);
        console.log(`Saldo Final Bob:   R$ ${(bobAccount.balance.amount / 100).toFixed(2)}`);
    } else {
        console.error('Erro ao recuperar contas para verificação.');
    }

    console.log('\n==================================================');
    console.log('             FIM DA DEMONSTRAÇÃO');
    console.log('==================================================\n');
}

runDemo().catch(console.error);
