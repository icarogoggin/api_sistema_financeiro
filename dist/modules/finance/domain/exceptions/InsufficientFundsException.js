"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsException = void 0;
class InsufficientFundsException extends Error {
    constructor() {
        super("Insufficient funds");
        this.name = "InsufficientFundsException";
    }
}
exports.InsufficientFundsException = InsufficientFundsException;
//# sourceMappingURL=InsufficientFundsException.js.map