import { AccountId, AccountHolderName, AccountType, BalanceAmount, TransactionAmount, TransactionId, MINIMUM_BALANCES } from "./types.js";
import { Account } from "./account.js";
import { v4 as uuidv4 } from "uuid";

export function createAccountHoldername(name: string): AccountHolderName {
  const trimmedName = name.trim();

  if (!trimmedName || trimmedName.length === 0) {
    throw new Error("Account holder name cannot be empty");
  }

  if (trimmedName.length < 2) {
    throw new Error("Account holder name must be at least 2 characters");
  }

  return trimmedName as AccountHolderName;
}

export function createBalanceAmount(amount: number): BalanceAmount {
  if (amount < 0) {
    throw new Error(`Balance can't be negative. Received; ${amount}`);
  }

  if (!Number.isFinite(amount)) {
    throw new Error("Balanced must be a finite number");
  }

  const rounderAmount = Math.round(amount * 100) / 100;

  return rounderAmount as BalanceAmount;
}

function validateInitialBalance(accountType: AccountType, initialBalance: BalanceAmount): void {
  const minimumRequired = MINIMUM_BALANCES[accountType];

  if (initialBalance < minimumRequired) {
    throw new Error(`${accountType} account requiers minimum $${minimumRequired} initial balance.` +
      `Received: $${initialBalance}`
    );
  }
}

export function createAccount(
  holderName: AccountHolderName,
  accountType: AccountType,
  initialBalance: BalanceAmount
): Account {
  validateInitialBalance(accountType, initialBalance);
  
  return {
    id: uuidv4() as AccountId,
    holderName,
    accountType,
    balance: initialBalance,
    createdAt: new Date(),
  };
}

export function depositMoney(
  account: Account,
  amount: TransactionAmount
): BalanceAmount {
  const newBalance = account.balance + amount;
  return createBalanceAmount(newBalance);
}

export function withdrawMoney(account: Account, amount: TransactionAmount): BalanceAmount {
  const newBalance = account.balance - amount;

  if (newBalance < 0) {
    throw new Error(`Insufficient funds. Available: $${account.balance}, Requested: $${amount}`);
  }

  const minimumRequired = MINIMUM_BALANCES[account.accountType];
  if (newBalance < minimumRequired) {
    throw new Error(`Withdrawl would violate minimum balance requirement. ` + `${account.accountType} accounts require minimum $${minimumRequired}.` + `Attempted new balance: $${newBalance}`);
  }

  return createBalanceAmount(newBalance);
}

export function transferMoney(fromAccount: Account, toAccount: Account, amount: TransactionAmount): [BalanceAmount, BalanceAmount] {
  if (fromAccount.id === toAccount.id) {
    throw new Error("Can't transfer to the same account");
  }

  const newSourceBalance = fromAccount.balance - amount;
  if (newSourceBalance < 0) {
    throw new Error(`Insufficient funds for transfer. ` + `Available: $${fromAccount.balance}, Requested: $${amount}`);
  }

  const minimumRequired = MINIMUM_BALANCES[fromAccount.accountType];
  if (newSourceBalance < minimumRequired) {
    throw new Error(
      `Transfer would violate minimum balance requirement. ` +
      `${fromAccount.accountType} accounts require minimum $${minimumRequired}. ` +
      `Attempted new balance: $${newSourceBalance}`
    );
  }
  
  const newDestBalance = toAccount.balance + amount;
  
  return [
    createBalanceAmount(newSourceBalance),
    createBalanceAmount(newDestBalance),
  ];
}

export function createTransactionId(): TransactionId {
  return uuidv4() as TransactionId;
}