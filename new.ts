// TypeScript Recap - 04.09.2026

//npx tsx new.ts --> in terminal to run code
//or use TypeScript Playground website

let age:number = 20;
    age = 10; // don't need to use let cause age has already been defined

const country:string = "Sweden"; // can't change a constant

const countries:string[] = ["Sweden",
                            "Germany",
                            "Greece"
                        ];

type FlightType = {     // flight object has subvariables
    id: number | string,     // ... of type "number" or "string" --> unison type
    destination: string,   // ... of type "string" ...
    available: boolean,
    weather?: string,       // the ? makes it optional
                };

const FlightSchedule: FlightType[] = [                      // array
    {id: 23, destination: "Istanbul", available: true },
    {id: 24, destination: "Berlin", available: false},
    {id: 25, destination: "Athens", available: true},
];

if (age >= 18) {    // basic if else function
    console.log("You're an adult")    
    } else {
    console.log("Go to your room")
    }

const message = age >= 18?  // condition? result if True: Result if False
    "You are an adult.":
    "You are just a kid!"
console.log(message)

// Python for loops
/* 
number_list = [3, 4, 5, 6, 7]
new_list = []

for number in number_list:
    new_number = (number **2) + 1
    new_list.append(new_number)
*/

// for loops in TypeScript
const numberList: number[] = [3, 4, 5, 6, 7]
const newList: number[] = []

for (let num = 0; num < numberList.length;    // starting condition, ending condition, ???
    num++) {                                     // indenting doesn't mean much in ts, but the brackets do
        newList.push(numberList[num] **2 +1)
    }

// function in JavaScript
/*
function addNumbers(x, y) {
    return x + y
    }
*/

// traditional function in TypeScript
function addNumbers(x: number, y: number): number {      // arguments need types, and the result needs a type
    console.log(x + y)
    return x + y
}

const result = addNumbers(3, 5)

const addNumberz = function(){} // can also use const to declare a function

// Arrow function (like Lambda function in Python)
const add = (x: number, y: number): number => 
    {
        return x + y
    }

const squaredList = newList.map((num) => num**2)    // num = argment, num**2 = function
// .forEach(function)



// 11.09.2026 - replacement lab

const numberLizt: number[] = [1, 2, 3, 4, 5, 6]
numberLizt.filter((i) => i > 3)
 // [4, 5, 6]
numberLizt.some((i) => i > 3)
 // true
numberLizt.every((i) => i > 3)
 // false
