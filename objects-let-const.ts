// Lesson: Creating objects with const and let

// An object groups related values together.
const passenger = {
  name: "Ada",
  age: 28,
  hasCheckedIn: false,
};

console.log("Original passenger:", passenger);

// const means the variable cannot point to a different object.
// However, the properties inside the object can still change.
passenger.hasCheckedIn = true;
passenger.age = 29;

console.log("Updated passenger:", passenger);

// This would cause a TypeScript error because passenger was declared with const:
// passenger = {
//   name: "Grace",
//   age: 35,
//   hasCheckedIn: true,
// };


// let allows the variable to point to a different object later.
let currentFlight = {
  flightNumber: "SK123",
  destination: "Paris",
  delayed: false,
};

console.log("First flight:", currentFlight);

// We can change one property.
currentFlight.delayed = true;

console.log("Delayed flight:", currentFlight);

// Because currentFlight uses let, we can replace the whole object.
// The new object must still have the same property types.
currentFlight = {
  flightNumber: "SK456",
  destination: "London",
  delayed: false,
};

console.log("New current flight:", currentFlight);


// We can also declare the object type explicitly.
type Booking = {
  reference: string;
  destination: string;
  confirmed: boolean;
};

const booking: Booking = {
  reference: "ABC123",
  destination: "Rome",
  confirmed: false,
};

booking.confirmed = true;

console.log("Booking:", booking);


// Main idea:
// const object -> properties can change, but the whole object cannot be replaced.
// let object   -> properties can change, and the whole object can be replaced.


// Small exercise:
// 1. Create a const object called airport with name, city, and isOpen properties.
// 2. Change isOpen from true to false.
// 3. Create a let object called selectedGate.
// 4. Replace selectedGate with another object that has the same property types.
