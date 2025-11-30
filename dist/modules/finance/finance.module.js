"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const AccountController_1 = require("./presentation/controllers/AccountController");
const CreateAccountUseCase_1 = require("./application/use-cases/CreateAccountUseCase");
const TransferFundsUseCase_1 = require("./application/use-cases/TransferFundsUseCase");
const PrismaAccountRepository_1 = require("./infrastructure/persistence/prisma/repositories/PrismaAccountRepository");
const prisma_service_1 = require("./infrastructure/persistence/prisma/prisma.service");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [AccountController_1.AccountController],
        providers: [
            CreateAccountUseCase_1.CreateAccountUseCase,
            TransferFundsUseCase_1.TransferFundsUseCase,
            prisma_service_1.PrismaService,
            {
                provide: 'IAccountRepository',
                useClass: PrismaAccountRepository_1.PrismaAccountRepository,
            },
        ],
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map