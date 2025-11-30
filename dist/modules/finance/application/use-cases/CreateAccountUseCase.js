"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountUseCase = void 0;
const common_1 = require("@nestjs/common");
const Result_1 = require("../../../../core/logic/Result");
const Money_vo_1 = require("../../domain/value-objects/Money.vo");
const Account_entity_1 = require("../../domain/entities/Account.entity");
let CreateAccountUseCase = class CreateAccountUseCase {
    accountRepo;
    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }
    async execute(dto) {
        const balanceOrError = Money_vo_1.Money.create(dto.initialBalance, dto.currency);
        if (balanceOrError.isFailure)
            return Result_1.Result.fail(balanceOrError.error);
        const balance = balanceOrError.getValue();
        const accountOrError = Account_entity_1.Account.create({
            balance: balance,
            status: 'ACTIVE',
            allowOverdraft: dto.allowOverdraft,
        });
        if (accountOrError.isFailure)
            return Result_1.Result.fail(accountOrError.error);
        const account = accountOrError.getValue();
        await this.accountRepo.save(account);
        return Result_1.Result.ok();
    }
};
exports.CreateAccountUseCase = CreateAccountUseCase;
exports.CreateAccountUseCase = CreateAccountUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object])
], CreateAccountUseCase);
//# sourceMappingURL=CreateAccountUseCase.js.map