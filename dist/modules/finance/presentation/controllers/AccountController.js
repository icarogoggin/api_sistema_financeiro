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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const CreateAccountUseCase_1 = require("../../application/use-cases/CreateAccountUseCase");
const TransferFundsUseCase_1 = require("../../application/use-cases/TransferFundsUseCase");
const CreateAccountDto_1 = require("../../application/dtos/CreateAccountDto");
const TransferFundsDto_1 = require("../../application/dtos/TransferFundsDto");
let AccountController = class AccountController {
    createAccountUseCase;
    transferFundsUseCase;
    constructor(createAccountUseCase, transferFundsUseCase) {
        this.createAccountUseCase = createAccountUseCase;
        this.transferFundsUseCase = transferFundsUseCase;
    }
    async create(dto, res) {
        const result = await this.createAccountUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(common_1.HttpStatus.CREATED).send();
    }
    async transfer(dto, res) {
        const result = await this.transferFundsUseCase.execute(dto);
        if (result.isFailure) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: result.error });
        }
        return res.status(common_1.HttpStatus.OK).send();
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAccountDto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TransferFundsDto_1.TransferFundsDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "transfer", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [CreateAccountUseCase_1.CreateAccountUseCase,
        TransferFundsUseCase_1.TransferFundsUseCase])
], AccountController);
//# sourceMappingURL=AccountController.js.map