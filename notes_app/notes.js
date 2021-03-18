const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        console.log(chalk.green.inverse("note added!"));
        saveNotes(notes);
    } else {
        console.log("Note title taken!");
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = (title) => {
    const notes = loadNotes();
    const NotesNotRemoved = notes.filter((note) => note.title !== title);
    if (notes.length == 0) {
        console.log(chalk.red("no notes to remove!"));
    } else if (notes.length === NotesNotRemoved.length) {
        console.log(chalk.red("no notes match the title"));
    } else {
        console.log(chalk.green("note removed!"));
        saveNotes(NotesNotRemoved);
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Your notes:"));
    notes.forEach((note) => console.log(chalk.magenta(note.title)));
};

const readNote = (title) => {
    const notes = loadNotes();
    NoteToRead = notes.find((note) => note.title === title);
    if (NoteToRead) {
        console.log(chalk.cyan.inverse(NoteToRead.title));
        console.log(NoteToRead.body);
    } else {
        console.log(chalk.red("No Match Found!"));
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};
