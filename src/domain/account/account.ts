import { AccountId, AccountHolderName, AccountType, BalanceAmount } from "./types.js";

export type Account = {
  readonly id: AccountId;
  readonly holderName: AccountHolderName;
  readonly accountType: AccountType;
  balance : BalanceAmount;
  readonly createdAt: Date;
};