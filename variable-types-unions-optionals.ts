/*
  TypeScript lesson:
  - Typing variables
  - Type mismatches
  - Union types
  - Optional properties and parameters with ?

  The lines that intentionally cause TypeScript errors are commented out.
  Uncomment them one at a time during the lesson.
*/

// ------------------------------------------------------------
// 1. TYPING VARIABLES
// ------------------------------------------------------------

// Explicit types: we tell TypeScript what each variable may contain.
let studentName: string = "Ada";
let studentAge: number = 24;
let isEnrolled: boolean = true;
let completedCourses: string[] = ["JavaScript", "HTML"];

console.log(studentName);
console.log(studentAge);
console.log(isEnrolled);
console.log(completedCourses);

// Type inference: TypeScript can often work out the type automatically.
let city = "Stockholm"; // TypeScript infers: string
let score = 80; // TypeScript infers: number

city = "Paris";
score = 95;

console.log(city, score);

// ------------------------------------------------------------
// 2. TYPE MISMATCHES
// ------------------------------------------------------------

// A variable can only receive values allowed by its type.
let flightNumber: string = "SK123";
let availableSeats: number = 12;

// Uncomment these lines one at a time to see TypeScript errors:

// flightNumber = 123;
// Error: number is not assignable to string.

// availableSeats = "twelve";
// Error: string is not assignable to number.

// isEnrolled = "yes";
// Error: string is not assignable to boolean.

// completedCourses.push(42);
// Error: number is not assignable to string.

console.log(flightNumber, availableSeats);

// Function arguments are also type-checked.
function printPassenger(name: string, age: number): void {
  console.log(`${name} is ${age} years old.`);
}

printPassenger("Grace", 30);

// Uncomment to demonstrate argument type mismatches:
// printPassenger(30, "Grace");

// ------------------------------------------------------------
// 3. UNION TYPES
// ------------------------------------------------------------

// A union type allows more than one possible type.
let bookingReference: string | number = "ABC123";

console.log(bookingReference);

bookingReference = 987654;

console.log(bookingReference);

// This is still not allowed because boolean is not in the union:
// bookingReference = true;

// Union types can also restrict values to specific options.
type FlightStatus = "scheduled" | "delayed" | "cancelled";

let currentStatus: FlightStatus = "scheduled";
console.log(currentStatus);

currentStatus = "delayed";
console.log(currentStatus);

// Uncomment to see an invalid union value:
// currentStatus = "waiting";

// A function can accept a union type.
function formatId(id: string | number): string {
  return `ID: ${id}`;
}

console.log(formatId("PASS-100"));
console.log(formatId(500));

// TypeScript requires us to narrow the union before using type-specific methods.
function describeValue(value: string | number): string {
  if (typeof value === "string") {
    return `Text: ${value.toUpperCase()}`;
  }

  return `Number: ${value.toFixed(2)}`;
}

console.log(describeValue("hello"));
console.log(describeValue(42));

// ------------------------------------------------------------
// 4. OPTIONAL OBJECT PROPERTIES WITH ?
// ------------------------------------------------------------

type Passenger = {
  name: string;
  age: number;
  passportNumber: string;
  email?: string;
  mealPreference?: "standard" | "vegetarian" | "vegan";
};

// name, age, and passportNumber are required.
// email and mealPreference are optional because they use ?.
const passengerOne: Passenger = {
  name: "Lin",
  age: 28,
  passportNumber: "P123456",
};

const passengerTwo: Passenger = {
  name: "Sam",
  age: 35,
  passportNumber: "P987654",
  email: "sam@example.com",
  mealPreference: "vegetarian",
};

console.log(passengerOne);
console.log(passengerTwo);

// An optional property has the type "the declared type | undefined".
// passengerOne.email is therefore string | undefined.

if (passengerOne.email !== undefined) {
  console.log(`Email: ${passengerOne.email}`);
} else {
  console.log("No email was provided.");
}

// Use ?? to provide a fallback for an optional value.
const passengerEmail: string = passengerOne.email ?? "No email provided";
console.log(passengerEmail);

// Required properties cannot be omitted:
/*
const invalidPassenger: Passenger = {
  name: "Alex",
  age: 40,
  // passportNumber is missing, so TypeScript reports an error.
};
*/

// Optional does not mean "any type".
// The property may be absent, but when present it must have the correct type.
// passengerTwo.email = 123;

// ------------------------------------------------------------
// 5. OPTIONAL FUNCTION PARAMETERS WITH ?
// ------------------------------------------------------------

function greetPassenger(name: string, destination?: string): string {
  if (destination !== undefined) {
    return `Hello ${name}. Your destination is ${destination}.`;
  }

  return `Hello ${name}.`;
}

console.log(greetPassenger("Maya"));
console.log(greetPassenger("Maya", "Berlin"));

// destination? means destination has the type string | undefined.

function calculatePrice(basePrice: number, discount?: number): number {
  const safeDiscount: number = discount ?? 0;
  return basePrice - safeDiscount;
}

console.log(calculatePrice(100)); // 100
console.log(calculatePrice(100, 20)); // 80
console.log(calculatePrice(100, 0)); // 100; zero is preserved by ??

// ------------------------------------------------------------
// 6. IMPORTANT: ? CANNOT BE USED DIRECTLY ON A VARIABLE
// ------------------------------------------------------------

// This syntax is invalid:
// let gate?: string;

// For a variable that may be missing, use a union with undefined.
let gate: string | undefined = undefined;

console.log(gate);

gate = "A12";
console.log(gate);

// ------------------------------------------------------------
// 7. SMALL PRACTICAL EXAMPLE
// ------------------------------------------------------------

type Booking = {
  id: string | number;
  passengerName: string;
  destination: string;
  status: FlightStatus;
  seatNumber?: string;
};

const booking: Booking = {
  id: "BOOK-101",
  passengerName: "Nora",
  destination: "Rome",
  status: "scheduled",
};

function printBookingSummary(currentBooking: Booking): void {
  const seat: string = currentBooking.seatNumber ?? "Not assigned";

  console.log("--- Booking Summary ---");
  console.log(`ID: ${currentBooking.id}`);
  console.log(`Passenger: ${currentBooking.passengerName}`);
  console.log(`Destination: ${currentBooking.destination}`);
  console.log(`Status: ${currentBooking.status}`);
  console.log(`Seat: ${seat}`);
}

printBookingSummary(booking);

booking.seatNumber = "14C";
booking.status = "delayed";

printBookingSummary(booking);

// ------------------------------------------------------------
// CLASSROOM EXERCISES
// ------------------------------------------------------------

// 1. Create a variable that accepts either a string or a boolean.
// 2. Add "boarding" as a valid FlightStatus.
// 3. Add an optional phoneNumber property to Passenger.
// 4. Create a function with one required and one optional parameter.
// 5. Uncomment one type mismatch, read the error, and correct it.
