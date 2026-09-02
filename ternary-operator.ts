// TERNARY OPERATOR
// A ternary chooses between two values using one condition.
//
// Pattern:
// condition ? valueIfTrue : valueIfFalse

// 1. Basic example
const age: number = 20;

const ageMessage: string = age >= 18
  ? "You are an adult."
  : "You are under 18.";

console.log(ageMessage);

// 2. The same decision using if/else
let accessWithIf: string;

if (age >= 18) {
  accessWithIf = "Access granted";
} else {
  accessWithIf = "Access denied";
}

// The ternary is shorter when we only need to choose one value.
const accessWithTernary: string = age >= 18
  ? "Access granted"
  : "Access denied";

console.log(accessWithIf);
console.log(accessWithTernary);

// 3. A ternary with a boolean variable
const isFlightDelayed: boolean = true;

const flightStatus: string = isFlightDelayed
  ? "Delayed"
  : "On time";

console.log(`Flight status: ${flightStatus}`);

// 4. A ternary inside a template string
const passengerName: string = "Ada";
const hasCheckedIn: boolean = false;

console.log(
  `${passengerName}: ${hasCheckedIn ? "Checked in" : "Not checked in"}`
);

// 5. A ternary inside a function
const getTemperatureMessage = (temperature: number): string => {
  return temperature > 25
    ? "It is warm."
    : "It is cool.";
};

console.log(getTemperatureMessage(30));
console.log(getTemperatureMessage(18));

// 6. A ternary can return values other than strings
const score: number = 75;

const bonusPoints: number = score >= 70 ? 10 : 0;
const passed: boolean = score >= 50 ? true : false;

console.log(`Bonus points: ${bonusPoints}`);
console.log(`Passed: ${passed}`);

// The boolean ternary above can be simplified:
const passedSimplified: boolean = score >= 50;
console.log(`Passed (simplified): ${passedSimplified}`);

// 7. Use parentheses when the condition is long
const hasPassport: boolean = true;
const hasTicket: boolean = true;

const canBoard: string = (hasPassport && hasTicket)
  ? "You may board."
  : "You cannot board.";

console.log(canBoard);

// 8. Ternaries are best for choosing one of two values.
// Use if/else when each branch needs several actions.
const destination: string = "Paris";

const destinationMessage: string = destination === "Paris"
  ? "Bienvenue à Paris!"
  : "Have a pleasant journey!";

console.log(destinationMessage);

// Avoid deeply nested ternaries because they become difficult to read.
// Prefer if/else for three or more complicated outcomes.
