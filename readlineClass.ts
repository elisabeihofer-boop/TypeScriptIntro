import * as readline from "readline";

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readlineInterface.question(`What is your name user? `, (userAnswer: string) => {
    console.log(`Hello ${userAnswer}! I am Elisa. Nice to meet you.`);
    readlineInterface.close(); // close terminal
})

readlineInterface.question(`What is 5 times 10?`, (userAnswer: string) =>{
    // rest missing
})