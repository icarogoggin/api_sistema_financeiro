
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/modules/finance/infrastructure/persistence/prisma/prisma.service';

describe('AccountController (e2e)', () => {
  let app: INestApplication;

  const mockAccountRepo = {
    save: jest.fn().mockResolvedValue(undefined),
    findById: jest.fn().mockResolvedValue(null),
  };

  const mockPrismaService = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    onModuleInit: jest.fn().mockResolvedValue(undefined),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('IAccountRepository')
      .useValue(mockAccountRepo)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/accounts (POST) - should create an account', () => {
    mockAccountRepo.save.mockClear();
    return request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'Test Account',
        initialBalance: 1000,
        currency: 'BRL',
        allowOverdraft: false,
      })
      .expect(201)
      .then(() => {
        expect(mockAccountRepo.save).toHaveBeenCalled();
      });
  });

  it('/accounts/transfer (POST) - should fail if account not found', () => {
    mockAccountRepo.findById.mockResolvedValue(null);
    return request(app.getHttpServer())
      .post('/accounts/transfer')
      .send({
        fromId: '123',
        toId: '456',
        amount: 100,
        currency: 'BRL'
      })
      .expect(400);
  });
});
