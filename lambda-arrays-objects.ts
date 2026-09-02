// Lambda functions in TypeScript are usually called arrow functions.

// 1. No parameters, no useful return value
const greet = (): void => {
  console.log("Welcome to the flight desk!");
};
greet();

// 2. One parameter and an implicit return
const makeGreeting = (name: string): string => `Hello, ${name}!`;
console.log(makeGreeting("Ada"));

// 3. Multiple parameters
const addBaggageFee = (price: number, fee: number): number => price + fee;
console.log(addBaggageFee(120, 25));

// 4. Block body: use return when there are several statements
const describePrice = (price: number): string => {
  const category = price < 100 ? "cheap" : "standard";
  return `${price} EUR is ${category}.`;
};
console.log(describePrice(80));

// 5. Default parameter
const formatCity = (city: string, uppercase = false): string =>
  uppercase ? city.toUpperCase() : city;
console.log(formatCity("Stockholm", true));

// Arrays
const cities: string[] = ["Stockholm", "Paris", "Rome", "Berlin"];

// map: transform every item
const cityLabels: string[] = cities.map((city) => `Flight to ${city}`);
console.log(cityLabels);

// filter: keep matching items
const shortCityNames: string[] = cities.filter((city) => city.length <= 5);
console.log(shortCityNames);

// find: get the first match; result may be undefined
const paris: string | undefined = cities.find((city) => city === "Paris");
console.log(paris ?? "City not found");

// some: check whether at least one item matches
const hasRome: boolean = cities.some((city) => city === "Rome");
console.log(`Rome available: ${hasRome}`);

// Add without changing the original array
const moreCities: string[] = [...cities, "Madrid"];
console.log(moreCities);

type Flight = {
  id: number;
  destination: string;
  price: number;
  available: boolean;
};

const flights: Flight[] = [
  { id: 1, destination: "Paris", price: 120, available: true },
  { id: 2, destination: "Rome", price: 90, available: false },
  { id: 3, destination: "Berlin", price: 150, available: true },
];

// Object update with spread: create a new object
const parisFlight: Flight = flights[0]!;
const discountedFlight: Flight = { ...parisFlight, price: 100 };
console.log(discountedFlight);

// Destructure useful properties
const { destination, price } = discountedFlight;
console.log(`${destination}: ${price} EUR`);

// Combine array methods with objects
const availableFlights: Flight[] = flights.filter((flight) => flight.available);
const destinations: string[] = availableFlights.map((flight) => flight.destination);
console.log(destinations);

// reduce: combine all items into one value
const totalPrice: number = flights.reduce(
  (total, flight) => total + flight.price,
  0
);
console.log(`Total price: ${totalPrice} EUR`);

// A function can receive another function
const printFlight = (flight: Flight): void => {
  console.log(`${flight.id}: ${flight.destination}`);
};
flights.forEach(printFlight);

// Quick exercise: change this to return only flights below 130 EUR.
const affordableFlights: Flight[] = flights.filter((flight) => flight.price < 130);
console.log(affordableFlights);
