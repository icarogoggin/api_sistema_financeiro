
export class AccountInactiveException extends Error {
    constructor() {
        super("Account is inactive");
        this.name = "AccountInactiveException";
    }
}
