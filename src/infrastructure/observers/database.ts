import { DomainEvent } from "../../domain/events/events.js";

export function saveToDatabase(event: DomainEvent): void {
  console.log(`DATABASE: Saving event to audit log`);
  console.log(`Event Type: ${event.type}`);
  console.log(`Timestamp: ${event.timestamp.toISOString()}`);

  switch (event.type) {
    case "AccountCreated":
      console.log(`Account ID: ${event.accountId}`);
      console.log(`Holder: ${event.holderName}`);
      console.log(`Type: ${event.accountType}`);
      console.log(`Initial Balance: $${event.initialBalance}`);
      break;

    case "MoneyDeposited":
      console.log(`Transaction ID: ${event.transactionId}`);
      console.log(`Account ID: ${event.accountId}`);
      console.log(`Amount: $${event.amount}`);
      console.log(`Old Balance: $${event.oldBalance} → New Balance: $${event.newBalance}`);
      break;

    case "MoneyWithdrawn":
      console.log(`Transaction ID: ${event.transactionId}`);
      console.log(`Account ID: ${event.accountId}`);
      console.log(`Amount: $${event.amount}`);
      console.log(`Old Balance: $${event.oldBalance} → New Balance: $${event.newBalance}`,);
      break;

    case "MoneyTransferred":
      console.log(`Transaction ID: ${event.transactionId}`);
      console.log(
        `   From: ${event.fromAccountId} ($${event.fromOldBalance} → $${event.fromNewBalance})`,
      );
      console.log(
        `   To: ${event.toAccountId} ($${event.toOldBalance} → $${event.toNewBalance})`,
      );
      console.log(`   Amount: $${event.amount}`);
      break;

    case "InsufficientFundsAttempted":
      console.log(`SECURITY LOG: Failed ${event.operationType} attempt`);
      console.log(`Account ID: ${event.accountId}`);
      console.log(`Requested: $${event.requestedAmount}`);
      console.log(`Available: $${event.availableBalance}`);
      console.log(`Deficit: $${event.requestedAmount - event.availableBalance}`,);
      break;
  }

  console.log(`Event persisted successfully`);
}
