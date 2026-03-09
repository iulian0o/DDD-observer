import { AccountId, AccountHolderName, AccountType, BalanceAmount, TransactionAmount, TransactionId } from "../account/types.js";

export type AccountCreatedEvent = {
  readonly type: "AccountCreated";
  readonly accountId: AccountId;
  readonly holderName: AccountHolderName;
  readonly accountType: AccountType;
  readonly initialBalance: BalanceAmount;    
  readonly timestamp: Date;
};

export type MoneyDepositedEvent = {
  readonly type: "MoneyDeposited";
  readonly transactionId: TransactionId;
  readonly accountId: AccountId;
  readonly amount: TransactionAmount;
  readonly oldBalance: BalanceAmount;
  readonly newBalance: BalanceAmount;
  readonly timestamp: Date;
};

export type MoneyWithdrawnEvent = {
  readonly type: "MoneyWithdrawn";
  readonly transactionId: TransactionId;
  readonly accountId: AccountId;
  readonly amount: TransactionAmount;
  readonly oldBalance: BalanceAmount;
  readonly newBalance: BalanceAmount;
  readonly timestamp: Date;
};

export type MoneyTransferredEvent = {
  readonly type: "MoneyTransferred";
  readonly transactionId: TransactionId;
  readonly fromAccountId: AccountId;
  readonly toAccountId: AccountId;
  readonly amount: TransactionAmount;
  readonly fromOldBalance: BalanceAmount;
  readonly fromNewBalance: BalanceAmount;
  readonly toOldBalance: BalanceAmount;
  readonly toNewBalance: BalanceAmount;
  readonly timestamp: Date;
};

export type InsufficientFundsAttemptedEvent = {
  readonly type: "InsufficientFundsAttempted";
  readonly accountId: AccountId;
  readonly requestedAmount: TransactionAmount;
  readonly availableBalance: BalanceAmount;
  readonly operationType: "withdrawal" | "transfer";
  readonly timestamp: Date;
};

export type DomainEvent =
  | AccountCreatedEvent
  | MoneyDepositedEvent
  | MoneyWithdrawnEvent
  | MoneyTransferredEvent
  | InsufficientFundsAttemptedEvent;