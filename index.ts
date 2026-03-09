import {
  observers,
  emitEvent,
} from "./src/infrastructure/observers/observer.js";
import { sendEmailNotification } from "./src/infrastructure/observers/email.js";
import { fraudDetectionMonitor } from "./src/infrastructure/observers/fraudDetection.js";
import { saveToDatabase } from "./src/infrastructure/observers/database.js";
import {
  createAccount,
  createAccountHoldername,
  createBalanceAmount,
} from "./src/domain/account/factories.js";

observers.push(sendEmailNotification);
observers.push(saveToDatabase);
observers.push(fraudDetectionMonitor);

try {
  const account = createAccount(
    createAccountHoldername("John Doe"),
    "Checking",
    createBalanceAmount(1000),
  );

  emitEvent({
    type: "AccountCreated",
    accountId: account.id,
    holderName: account.holderName,
    accountType: account.accountType,
    initialBalance: account.balance,
    timestamp: new Date(),
  });
} catch (error) {
  console.error("Error!!");
}
