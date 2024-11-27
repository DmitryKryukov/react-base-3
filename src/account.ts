let accountLastID: number = 0;

interface IAccount {
    accountID: number;
    getBalance(): number;
    getStatus(): string;
    showStatus(): void;
    depositFunds(amount: number): void;
    withdrawFunds(amount: number): void;
}

class Account implements IAccount {
    readonly accountID: number;
    protected accountBalance: number = 0;

    constructor(startBalance: number) {
        this.accountID = ++accountLastID;
        this.accountBalance = startBalance;
    }

    getBalance(): number {
        return this.accountBalance;
    }

    getStatus(): string {
        return `№${this.accountID}\nБаланс: ${this.accountBalance} ₽\n———\n`;
    }

    showStatus(): void {
        console.log(this.getStatus());
    }

    depositFunds(amount: number): void {
        if (amount < 0) throw new Error("Отрицательная сумма пополнения");
        this.accountBalance += amount;
        console.log(`🐖 Пополнили счёт на ${amount} ₽`);
    }

    withdrawFunds(amount: number): void {
        if (amount < 0) throw new Error("Отрицательная сумма снятия");
        if (amount > this.accountBalance) {
            console.log("На счету не хватает средств для снятия");
            return;
        }
        this.accountBalance -= amount;
        console.log(`💸 Сняли с счёта ${amount} ₽`);
    }
}

class DebitAccount extends Account {
    getStatus(): string {
        return `Дебетовый счёт №${this.accountID}\nБаланс: ${this.getBalance()} ₽\n———\n`;
    }
    // Здесь может быть какая-то уникальная логика для дебетового счёта, но в рамках задания она является логикой по умолчанию в родительском классе ¯\_(ツ)_/¯
}

class CreditAccount extends Account {
    private accountLimit: number;
    private baseAccountLimit: number;

    constructor(startBalance: number, accountLimit: number) {
        super(startBalance);
        this.baseAccountLimit = accountLimit;
        this.accountLimit = accountLimit;
    }

    getStatus(): string {
        return `Кредитный счёт №${this.accountID}\nЛимит: ${this.accountLimit} ₽\n${this.getBalance()> 0 ? "Баланс:" : "Долг:"} ${Math.abs(this.getBalance())} ₽\n———\n`;
    }

    withdrawFunds(amount: number): void {
        if (amount < 0) throw new Error("Отрицательная сумма снятия");
        if (amount > this.accountLimit) {
            console.log("Лимит на снятие исчерпан");
            return;
        }
        this.accountLimit -= amount;
        this.accountBalance -= amount;
        console.log(`💸 Сняли с счёта ${amount} ₽`);
    }

    refreshAccountLimit(): void {
        this.accountLimit = this.baseAccountLimit;
    }
}

export { DebitAccount, CreditAccount };
