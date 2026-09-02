// Install first: npm install xstate

import { createActor, setup } from "xstate";

type Book = {
  title: string;
  available: boolean;
};

// The key is the lowercase version of the book title.
const library: Record<string, Book | undefined> = {
  "the hobbit": { title: "The Hobbit", available: true },
  dune: { title: "Dune", available: false },
  "1984": { title: "1984", available: true },
};

const normalize = (text: string): string => {
  return text.toLowerCase().trim();
};

const findBook = (input: string): Book | undefined => {
  return library[normalize(input)];
};

type LibraryEvent = {
  type: "USER_INPUT";
  text: string;
};

const libraryMachine = setup({
  types: {
    events: {} as LibraryEvent,
  },

  // Guards answer true-or-false questions.
  guards: {
    wantsToFinish: ({ event }) => {
      return normalize(event.text) === "that's all";
    },

    bookIsAvailable: ({ event }) => {
      return findBook(event.text)?.available === true;
    },

    bookExists: ({ event }) => {
      return findBook(event.text) !== undefined;
    },
  },

  actions: {
    askForBook: () => {
      console.log(
        'LIBRARIAN: Enter a book title, or say "That\'s all".'
      );
    },

    printAvailable: ({ event }) => {
      const book = findBook(event.text);
      console.log(`LIBRARIAN: "${book?.title}" is available.`);
    },

    printUnavailable: ({ event }) => {
      const book = findBook(event.text);
      console.log(
        `LIBRARIAN: "${book?.title}" exists, but is unavailable.`
      );
    },

    printNotFound: ({ event }) => {
      console.log(
        `LIBRARIAN: I could not find "${event.text}".`
      );
    },

    printGoodbye: () => {
      console.log("LIBRARIAN: Goodbye!");
    },
  },
}).createMachine({
  id: "libraryAgent",
  initial: "waitingForBook",

  states: {
    waitingForBook: {
      entry: "askForBook",

      // XState checks these transitions from top to bottom.
      on: {
        USER_INPUT: [
          { guard: "wantsToFinish", target: "finished" },
          { guard: "bookIsAvailable", target: "available" },
          { guard: "bookExists", target: "unavailable" },
          { target: "notFound" },
        ],
      },
    },

    available: {
      entry: "printAvailable",
      always: { target: "waitingForBook" },
    },

    unavailable: {
      entry: "printUnavailable",
      always: { target: "waitingForBook" },
    },

    notFound: {
      entry: "printNotFound",
      always: { target: "waitingForBook" },
    },

    finished: {
      type: "final",
      entry: "printGoodbye",
    },
  },
});

const libraryAgent = createActor(libraryMachine);
libraryAgent.start();

// This helper simulates text entered by a user.
const userSays = (text: string): void => {
  console.log(`\nUSER: ${text}`);
  libraryAgent.send({ type: "USER_INPUT", text });
};

// Try every route through the machine.
userSays("Dune");          // Found, but unavailable
userSays("The Hobbit");   // Found and available
userSays("Harry Potter"); // Not found
userSays("That's all");    // Enter the final state
