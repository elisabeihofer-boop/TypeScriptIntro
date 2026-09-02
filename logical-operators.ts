export {};

// LESSON: ||, &&, and ?? in TypeScript
// Run with: npx tsx logical-operators.ts

console.log("\n--- 1. Logical OR: || ---");

// || uses the value on the right when the value on the left is falsy.
// Common falsy values: false, 0, "", null, undefined, and NaN.
const enteredName: string = "";
const displayName: string = enteredName || "Guest";

console.log(displayName); // Guest

const selectedLanguage: string = "Turkish";
const language: string = selectedLanguage || "English";

console.log(language); // Turkish

// || does not always return true or false.
// It returns one of its operands.
const preferredSeat: string = "";
const firstChoice: string = preferredSeat || "Window seat";
console.log(firstChoice); // Window seat

console.log("\n--- 2. Be careful with valid falsy values ---");

// Zero is a valid value here, but || treats it as missing.
const savedVolume: number | undefined = 0;
const volumeUsingOr: number = savedVolume || 50;

console.log(volumeUsingOr); // 50, not 0

// An empty string may also be intentional.
const savedMessage: string | undefined = "";
const messageUsingOr: string = savedMessage || "Default message";

console.log(messageUsingOr); // Default message

console.log("\n--- 3. Logical AND: && ---");

// && is true only when both boolean conditions are true.
const isLoggedIn: boolean = true;
const hasBoardingPass: boolean = true;
const canBoard: boolean = isLoggedIn && hasBoardingPass;

console.log(canBoard); // true

const passportIsValid: boolean = true;
const ticketIsValid: boolean = false;
const canEnterGate: boolean = passportIsValid && ticketIsValid;

console.log(canEnterGate); // false

// && can guard a quick action.
// The code on the right runs only when the left side is truthy.
canBoard && console.log("Passenger may board.");
canEnterGate && console.log("This line will not run.");

// && also returns one of its operands, not necessarily a boolean.
const welcomeMessage: string | false =
  isLoggedIn && "Welcome back!";

console.log(welcomeMessage); // Welcome back!

console.log("\n--- 4. Nullish coalescing: ?? ---");

// ?? uses the fallback only for null or undefined.
const chosenGate: string | undefined = undefined;
const gate: string = chosenGate ?? "Gate not assigned";

console.log(gate); // Gate not assigned

// Unlike ||, ?? preserves valid falsy values.
const volumeUsingNullish: number = savedVolume ?? 50;
const messageUsingNullish: string = savedMessage ?? "Default message";

console.log(volumeUsingNullish); // 0
console.log(messageUsingNullish); // An intentional empty string

const savedAlerts: boolean | undefined = false;
const alertsEnabled: boolean = savedAlerts ?? true;

console.log(alertsEnabled); // false

console.log("\n--- 5. Comparing || and ?? ---");

const retryCount: number | undefined = 0;

console.log(retryCount || 3); // 3: zero is falsy
console.log(retryCount ?? 3); // 0: zero is not null or undefined

const optionalTitle: string | null = "";

console.log(optionalTitle || "Untitled"); // Untitled
console.log(optionalTitle ?? "Untitled"); // Empty string

// Rule of thumb:
// Use || when every falsy value should use the fallback.
// Use ?? when only null and undefined mean "missing".

console.log("\n--- 6. Optional object properties ---");

type UserSettings = {
  theme?: "light" | "dark";
  volume?: number;
  notifications?: boolean;
};

const settings: UserSettings = {
  volume: 0,
  notifications: false,
};

// Optional properties may be undefined, so ?? is often useful.
const theme: "light" | "dark" = settings.theme ?? "light";
const volume: number = settings.volume ?? 50;
const notifications: boolean = settings.notifications ?? true;

console.log(theme); // light
console.log(volume); // 0
console.log(notifications); // false

console.log("\n--- 7. Useful functions ---");

// Use || when an empty name should also mean "Anonymous".
const getDisplayName = (name: string | undefined): string =>
  name || "Anonymous";

// Use ?? when zero is a valid limit.
const getRetryLimit = (
  limit: number | null | undefined,
): number => limit ?? 3;

// Use && when both requirements must be satisfied.
const mayBookFlight = (
  isAuthenticated: boolean,
  hasSelectedDestination: boolean,
): boolean => isAuthenticated && hasSelectedDestination;

console.log(getDisplayName("")); // Anonymous
console.log(getRetryLimit(0)); // 0
console.log(mayBookFlight(true, false)); // false

console.log("\n--- 8. Combining operators safely ---");

const customStatus: string | undefined = undefined;

// Parentheses make the order clear.
const status: string = (customStatus ?? "") || "Unknown status";
console.log(status);

// JavaScript does not allow ?? to be mixed directly with || or &&
// without parentheses.
// const invalid = customStatus ?? "" || "Unknown"; // Syntax error

const token: string | undefined = "abc123";
const hasToken: boolean = Boolean(token);
const mayAccessAccount: boolean = hasToken && isLoggedIn;

console.log(mayAccessAccount); // true

console.log("\n--- 9. Quick summary ---");

// value || fallback
// Use fallback when value is falsy.

// conditionA && conditionB
// Require both conditions, or run a small guarded action.

// value ?? fallback
// Use fallback only when value is null or undefined.

// Best question to ask:
// Is 0, "", or false a valid value?
// If yes, ?? is usually safer than ||.
