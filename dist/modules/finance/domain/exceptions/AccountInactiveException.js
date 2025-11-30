"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInactiveException = void 0;
class AccountInactiveException extends Error {
    constructor() {
        super("Account is inactive");
        this.name = "AccountInactiveException";
    }
}
exports.AccountInactiveException = AccountInactiveException;
//# sourceMappingURL=AccountInactiveException.js.map