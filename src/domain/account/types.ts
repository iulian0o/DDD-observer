export type AccountId = string & {readonly __brand: unique symbol};
export type AccountHolderName = string & {readonly __brand: unique symbol};
export type AccountType = "Checking" | "Savings" | "Investment";
export type BalanceAmount = number & {readonly __brand: unique symbol};
export type TransactionAmount = number & {readonly __brand: unique symbol};
export type TransactionId = string & {readonly __brand: unique symbol};

export const MINIMUM_BALANCES: Record<AccountType, number> = {
  Checking: 0,
  Savings: 100,
  Investment: 1000
} as const;