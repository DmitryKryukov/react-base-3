import { DebitAccount, CreditAccount } from "./account";

const debitAccount = new DebitAccount(0);
console.log("Стартовое состояние дебетового счёта:");
debitAccount.showStatus();

debitAccount.depositFunds(5542);
debitAccount.showStatus();

debitAccount.withdrawFunds(1488);
debitAccount.showStatus();

console.log("Пытаемся снять 9999 ₽, но на счету меньше:");
debitAccount.withdrawFunds(9999);
debitAccount.showStatus();

const creditAccount = new CreditAccount(0, 10000);
console.log("Стартовое состояние кредитного счёта:");
creditAccount.showStatus();

creditAccount.withdrawFunds(5500);
creditAccount.showStatus();

creditAccount.depositFunds(6500);
creditAccount.showStatus();

creditAccount.withdrawFunds(4500);
creditAccount.showStatus();

console.log("Пытаемся снять 9999 ₽, но лимит исчерпан:");
creditAccount.withdrawFunds(9999);
creditAccount.showStatus();

console.log("Сбрасываем лимит:");
creditAccount.refreshAccountLimit();
creditAccount.showStatus();

creditAccount.withdrawFunds(9999);
creditAccount.showStatus();
