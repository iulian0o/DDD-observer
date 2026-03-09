import { DomainEvent } from "../../domain/events/events.js";

export function fraudDetectionMonitor(event: DomainEvent): void {
  if (event.type === "InsufficientFundsAttempted") {
    console.log(`\nFRAUD DETECTION: Suspicious Activity Alert`);
    console.log(`Event: Multiple failed ${event.operationType} attempts detected`);
    console.log(`Account: ${event.accountId.substring(0, 8)}...`);
    console.log(`Attempted Amount: $${event.requestedAmount}`);
    console.log(`Account Balance: $${event.availableBalance}`);
    console.log(`Action: Flagged for manual review`);
    console.log(`Recommendation: Contact account holder for verification`);
  }
  
  if (event.type === "MoneyWithdrawn" && event.amount > 10000) {
    console.log(`\nFRAUD DETECTION: Large Withdrawal Alert`);
    console.log(`Account: ${event.accountId.substring(0, 8)}...`);
    console.log(`Amount: $${event.amount} (exceeds $10,000 threshold)`);
    console.log(`Action: Triggered enhanced verification protocol`);
  }
  
  if (event.type === "MoneyTransferred" && event.amount > 10000) {
    console.log(`\nFRAUD DETECTION: Large Transfer Alert`);
    console.log(`From Account: ${event.fromAccountId.substring(0, 8)}...`);
    console.log(`To Account: ${event.toAccountId.substring(0, 8)}...`);
    console.log(`Amount: $${event.amount} (exceeds $10,000 threshold)`);
    console.log(`Action: Transfer flagged for compliance review`);
  }
}