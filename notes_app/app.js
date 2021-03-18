const chalk = require("chalk");
const getNotes = require("./notes.js");
const yargs = require("yargs");
const notes = require("./notes.js");

// create add command
yargs.command({
    command: "add",
    describe: "add new note",
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "note body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

// create remove command
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "title of the note to be removed",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    },
});

// create list command
yargs.command({
    command: "list",
    describe: "listing the note",
    handler() {
        notes.listNotes();
    },
});

// create list command
yargs.command({
    command: "read",
    describe: "read the note",
    builder: {
        title: {
            describe: "note to read",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});
// console.log(process.argv);
// console.log(yargs.argv);

yargs.parse();
