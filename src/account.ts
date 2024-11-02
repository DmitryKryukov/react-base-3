let accountLastID: number = 0;
interface IAccount {
    accountID: number,
    accountBalance: number,
    getBalance(): number,
    getStatus(): string;
    showStatus(): void;
    depositFunds(amount: number): void,
    withdrawFunds(amount: number): void
}

class Account implements IAccount {
    readonly accountID: number;
    accountBalance: number = 0;
    constructor(startBalance:number) {
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
    depositFunds(amount: number){
        if (amount < 0 ) throw new Error("Отрицательная сумма пополнения");
        this.accountBalance += amount;
        console.log(`🐖 Пополнили счёт на ${amount} ₽`);
    }
    withdrawFunds(amount: number): void {
        if (amount < 0 ) throw new Error("Отрицательная сумма cнятия");
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
    //Здесь может быть какая-то уникальная логика для дебетового счёта, но в рамках задания она является логикой по умолчанию в родительском классе ¯\_(ツ)_/¯
}

class CreditAccount extends Account {
    accountLimit: number;
    baseAccountLimit: number;
    constructor(startBalance:number, accountLimit:number) {
        super(startBalance);
        this.baseAccountLimit = accountLimit;
        this.accountLimit = accountLimit;
    }
    getStatus() {
        return `Кредитный счёт №${this.accountID}\nЛимит: ${this.accountLimit} ₽\n${this.accountBalance > 0 ? "Баланс:" : "Долг:"} ${Math.abs(this.accountBalance)} ₽\n———\n`;
    }
    withdrawFunds(amount: number): void {
        if (amount < 0 ) throw new Error("Отрицательная сумма cнятия");
        if (amount > this.accountLimit) {
            console.log("Лимит на снятие исчерпан");
            return;
        }
        this.accountLimit -= amount;
        this.accountBalance -= amount;
        console.log(`💸 Сняли с счёта ${amount} ₽`);
    }
    refreshAccountLimit():void {
        this.accountLimit = this.baseAccountLimit;
    }
}

export {DebitAccount, CreditAccount};