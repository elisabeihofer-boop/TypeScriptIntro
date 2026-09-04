import { createActor, setup } from "xstate";
import * as readline from "node:readline";

type Book = {
  title: string;
  available: boolean;
};

const library: Book[] = [
  { title: "The Hobbit", available: true },
  { title: "1984", available: false },
  { title: "Dune", available: true },
];

type LibraryEvent = {
  type: "USER_INPUT";
  text: string;
};

const findBook = (text: string): Book | undefined =>
  library.find(
    (book) => book.title.toLowerCase() === text.trim().toLowerCase()
  );

const libraryMachine = setup({
  types: {
    events: {} as LibraryEvent,
  },

  guards: {
    isFinished: ({ event }) =>
      event.text.trim().toLowerCase() === "that's all",

    bookIsAvailable: ({ event }) =>
      findBook(event.text)?.available === true,

    bookIsUnavailable: ({ event }) =>
      findBook(event.text)?.available === false,
  },

  actions: {
    printAvailable: ({ event }) => {
      const book = findBook(event.text);
      console.log(`Yes, ${book?.title} is available.`);
    },

    printUnavailable: ({ event }) => {
      const book = findBook(event.text);
      console.log(`${book?.title} is in the library, but it is not available.`);
    },

    printNotFound: ({ event }) => {
      console.log(`I could not find "${event.text}" in the library.`);
    },

    printGoodbye: () => {
      console.log("Library session finished. Goodbye!");
    },
  },
}).createMachine({
  initial: "waitingForBook",

  states: {
    waitingForBook: {
      on: {
        USER_INPUT: [
          { guard: "isFinished", target: "finished" },
          { guard: "bookIsAvailable", target: "available" },
          { guard: "bookIsUnavailable", target: "unavailable" },
          { target: "notFound" },
        ],
      },
    },

    available: {
      entry: "printAvailable",
      always: "waitingForBook",
    },

    unavailable: {
      entry: "printUnavailable",
      always: "waitingForBook",
    },

    notFound: {
      entry: "printNotFound",
      always: "waitingForBook",
    },

    finished: {
      type: "final",
      entry: "printGoodbye",
    },
  },
});

const actor = createActor(libraryMachine);
actor.start();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForBook = (): void => {
  rl.question(
    'Enter a book title, or type "That\'s all": ',
    (answer: string) => {
      actor.send({
        type: "USER_INPUT",
        text: answer,
      });

      if (actor.getSnapshot().status === "done") {
        rl.close();
        return;
      }

      askForBook();
    }
  );
};

console.log("Library Agent");
console.log("Books: The Hobbit, 1984, Dune\n");

askForBook();
