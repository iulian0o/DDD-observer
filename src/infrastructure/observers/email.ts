import { DomainEvent } from "../../domain/events/events.js";

export function sendEmailNotification(event: DomainEvent): void {
  switch (event.type) {
    case "AccountCreated":
      console.log(`\nEMAIL: Welcome to Your New ${event.accountType} Account!`);
      console.log(`To: ${event.holderName}`);
      console.log(`Subject: Welcome - Account ${event.accountId.substring(0, 8)}... Created`);
      console.log(`Message: Your account has been opened with an initial balance of $${event.initialBalance}`);
      break;

    case "MoneyDeposited":
      console.log(`\nEMAIL: Deposit Confirmation`);
      console.log(`Account: ${event.accountId.substring(0, 8)}...`);
      console.log(`Amount Deposited: $${event.amount}`);
      console.log(`New Balance: $${event.newBalance}`);
      console.log(`Transaction ID: ${event.transactionId.substring(0, 8)}...`);
      break;

    case "MoneyWithdrawn":
      console.log(`\nEMAIL: Withdrawal Notification`);
      console.log(`Account: ${event.accountId.substring(0, 8)}...`);
      console.log(`Amount Withdrawn: $${event.amount}`);
      console.log(`New Balance: $${event.newBalance}`);
      console.log(`Transaction ID: ${event.transactionId.substring(0, 8)}...`);
      break;

    case "MoneyTransferred":
      console.log(`\nEMAIL: Transfer Confirmation`);
      console.log(`From Account: ${event.fromAccountId.substring(0, 8)}...`);
      console.log(`To Account: ${event.toAccountId.substring(0, 8)}...`);
      console.log(`Amount: $${event.amount}`);
      console.log(`Your New Balance: $${event.fromNewBalance}`);
      console.log(`Transaction ID: ${event.transactionId.substring(0, 8)}...`);
      break;

    case "InsufficientFundsAttempted":
      console.log(`\nEMAIL: Transaction Declined - Insufficient Funds`);
      console.log(`Account: ${event.accountId.substring(0, 8)}...`);
      console.log(`Requested Amount: $${event.requestedAmount}`);
      console.log(`Available Balance: $${event.availableBalance}`);
      console.log(`Operation: ${event.operationType}`);
      console.log(`If this wasn't you, please contact us immediately!`);
      break;
  }
}
