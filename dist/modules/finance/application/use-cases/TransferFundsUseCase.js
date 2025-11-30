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
exports.TransferFundsUseCase = void 0;
const common_1 = require("@nestjs/common");
const Result_1 = require("../../../../core/logic/Result");
const Money_vo_1 = require("../../domain/value-objects/Money.vo");
let TransferFundsUseCase = class TransferFundsUseCase {
    accountRepo;
    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }
    async execute(dto) {
        const from = await this.accountRepo.findById(dto.fromId);
        if (!from)
            return Result_1.Result.fail(`Account ${dto.fromId} not found`);
        const to = await this.accountRepo.findById(dto.toId);
        if (!to)
            return Result_1.Result.fail(`Account ${dto.toId} not found`);
        const amountOrError = Money_vo_1.Money.create(dto.amount, dto.currency);
        if (amountOrError.isFailure)
            return Result_1.Result.fail(amountOrError.error);
        const amount = amountOrError.getValue();
        const withdrawResult = from.withdraw(amount);
        if (withdrawResult.isFailure)
            return Result_1.Result.fail(withdrawResult.error);
        const depositResult = to.deposit(amount);
        if (depositResult.isFailure)
            return Result_1.Result.fail(depositResult.error);
        await this.accountRepo.save(from);
        await this.accountRepo.save(to);
        return Result_1.Result.ok();
    }
};
exports.TransferFundsUseCase = TransferFundsUseCase;
exports.TransferFundsUseCase = TransferFundsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object])
], TransferFundsUseCase);
//# sourceMappingURL=TransferFundsUseCase.js.map