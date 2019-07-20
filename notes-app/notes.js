const chalk = require('chalk');
const fs = require('fs');

const getNotes = function () {
    return 'Your notes ...';
}

const addNote =  (title, body) => {
    const notes = loadNotes();

    const chkDublicateNote = notes.filter( note => note.title === title )
    if(chkDublicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        
        saveNotes(notes);
        console.log(chalk.green.inverse('New Node added'));
    }else {
        console.log(chalk.yellow.inverse('Node added is already exits'));
    }
    
}

const saveNotes = (notes) => {
    const dataToSave = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataToSave);
}

const removeNote = (title) => {
    
    const notes = loadNotes();
    const noteToKeep = notes.filter( note => note.title !== title)
    if(notes.length > noteToKeep.length) {
        console.log(title);
        console.log(chalk.green.inverse(title + ' ' + 'has been removed !'));
        saveNotes(noteToKeep);
    }else {
        console.log(chalk.red.inverse(title + ' ' + 'does not exit in data so it cannot be romoved !'));
    }
    
}

const listNotes = () => {
    console.log(chalk.green.inverse("Your Notes !"));
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
    
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes: listNotes
};