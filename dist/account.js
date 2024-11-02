"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditAccount = exports.DebitAccount = void 0;
let accountLastID = 0;
class Account {
    constructor(startBalance) {
        this.accountBalance = 0;
        this.accountID = ++accountLastID;
        this.accountBalance = startBalance;
    }
    getBalance() {
        return this.accountBalance;
    }
    getStatus() {
        return `№${this.accountID}\nБаланс: ${this.accountBalance} ₽\n———\n`;
    }
    showStatus() {
        console.log(this.getStatus());
    }
    depositFunds(amount) {
        if (amount < 0)
            throw new Error("Отрицательная сумма пополнения");
        this.accountBalance += amount;
        console.log(`🐖 Пополнили счёт на ${amount} ₽`);
    }
    withdrawFunds(amount) {
        if (amount < 0)
            throw new Error("Отрицательная сумма cнятия");
        if (amount > this.accountBalance) {
            console.log("На счету не хватает средств для снятия");
            return;
        }
        this.accountBalance -= amount;
        console.log(`💸 Сняли с счёта ${amount} ₽`);
    }
}
class DebitAccount extends Account {
    getStatus() {
        return `Дебетовый счёт №${this.accountID}\nБаланс: ${this.accountBalance} ₽\n———\n`;
    }
}
exports.DebitAccount = DebitAccount;
class CreditAccount extends Account {
    constructor(startBalance, accountLimit) {
        super(startBalance);
        this.baseAccountLimit = accountLimit;
        this.accountLimit = accountLimit;
    }
    getStatus() {
        return `Кредитный счёт №${this.accountID}\nЛимит: ${this.accountLimit} ₽\n${this.accountBalance > 0 ? "Баланс:" : "Долг:"} ${Math.abs(this.accountBalance)} ₽\n———\n`;
    }
    withdrawFunds(amount) {
        if (amount < 0)
            throw new Error("Отрицательная сумма cнятия");
        if (amount > this.accountLimit) {
            console.log("Лимит на снятие исчерпан");
            return;
        }
        this.accountLimit -= amount;
        this.accountBalance -= amount;
        console.log(`💸 Сняли с счёта ${amount} ₽`);
    }
    refreshAccountLimit() {
        this.accountLimit = this.baseAccountLimit;
    }
}
exports.CreditAccount = CreditAccount;
