# Code Review: `fraudDetectionMonitor`

## Summary

Refactored `fraudDetectionMonitor.ts` to fix type-safety bugs and improve readability and maintainability.

---

## Bugs Fixed

### 1. Unsafe property access across event types
**Before:** All three `if` blocks ran on every call, accessing properties (e.g. `event.operationType`, `event.fromAccountId`) that don't exist on other event types. At runtime this produces `undefined` in log output silently.

**After:** Replaced chained `if` statements with a `switch` on `event.type`. Each `case` only executes for the matching event type, keeping property access scoped and type-safe.

### 2. Missing `break` / fall-through control flow
**Before:** No early exits between `if` blocks meant a `MoneyTransferred` event with a large amount would still evaluate the `InsufficientFundsAttempted` block unnecessarily.

**After:** Each `switch` case has an explicit `break`. A matched event exits immediately.

---

## Improvements

### 3. Named constant for the threshold
**Before:** `10000` was duplicated inline in two separate blocks.

**After:** Extracted to `LARGE_TRANSACTION_THRESHOLD = 10_000` at module scope. Single source of truth; numeric separator improves readability.

### 4. Threshold value in log output uses the constant
**Before:** The log message hardcoded `"$10,000"` as a string — if the threshold changed, the message would silently go stale.

**After:** The message derives from the constant via `.toLocaleString()`, keeping it automatically consistent.

### 5. Batched `console.log` calls
**Before:** Each alert fired 5–6 separate `console.log` calls, which interleave unpredictably under concurrent load.

**After:** Each alert builds a string array and joins it into a single `console.log` call, ensuring each alert prints atomically.

---

## What Was Not Changed

- Public function signature — no breaking change for callers.
- Alert content and wording — behaviour is identical from the outside.
- Import path for `DomainEvent`.
