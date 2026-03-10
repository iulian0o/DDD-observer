import { DomainEvent } from "../../domain/events/events.js";

const LARGE_TRANSACTION_THRESHOLD = 10_000;

export function fraudDetectionMonitor(event: DomainEvent): void {
  switch (event.type) {
    case "InsufficientFundsAttempted": {
      console.log([
        `\nFRAUD DETECTION: Suspicious Activity Alert`,
        `Event: Multiple failed ${event.operationType} attempts detected`,
        `Account: ${event.accountId.substring(0, 8)}...`,
        `Attempted Amount: $${event.requestedAmount}`,
        `Account Balance: $${event.availableBalance}`,
        `Action: Flagged for manual review`,
        `Recommendation: Contact account holder for verification`,
      ].join("\n"));
      break;
    }

    case "MoneyWithdrawn": {
      if (event.amount > LARGE_TRANSACTION_THRESHOLD) {
        console.log([
          `\nFRAUD DETECTION: Large Withdrawal Alert`,
          `Account: ${event.accountId.substring(0, 8)}...`,
          `Amount: $${event.amount} (exceeds $${LARGE_TRANSACTION_THRESHOLD.toLocaleString()} threshold)`,
          `Action: Triggered enhanced verification protocol`,
        ].join("\n"));
      }
      break;
    }

    case "MoneyTransferred": {
      if (event.amount > LARGE_TRANSACTION_THRESHOLD) {
        console.log([
          `\nFRAUD DETECTION: Large Transfer Alert`,
          `From Account: ${event.fromAccountId.substring(0, 8)}...`,
          `To Account: ${event.toAccountId.substring(0, 8)}...`,
          `Amount: $${event.amount} (exceeds $${LARGE_TRANSACTION_THRESHOLD.toLocaleString()} threshold)`,
          `Action: Transfer flagged for compliance review`,
        ].join("\n"));
      }
      break;
    }

    default:
      break;
  }
}