// const chalk = require('chalk');

const validator = require('validator');
const notes = require('./notes.js');
const yargs = require('yargs');

// const msg = getNotes();

// console.log(msg);
// console.log(validator.isEmail('sa@sa.com'));
// console.log(chalk.green('Success !'));
// console.log(chalk.blue.bgRed.bold('Hello world!'));
// console.log('Full Name=', process.argv[2] + ' ' + process.argv[3]);

yargs.version('1.1.0');



//create add command
yargs.command({
    command: 'add',
    discribe: 'Add a new Note',
    builder: {
        title: {
            describe: 'My title',
            demandOption: true,
            type: 'string'
        },
        body: {
            discribe: 'Body of notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create remove command
yargs.command({
    command: 'remove',
    discribe: 'Remove a new Note',
    builder: {
        title: {
            describe: 'Title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Removing a new Note!', argv);
        notes.removeNote(argv.title);
    }
})

//create list command
yargs.command({
    command: 'list',
    discribe: 'list down Note',
    handler() {
        notes.listNotes();
    }
})

//create read command
yargs.command({
    command: 'read',
    discribe: 'Read a new Note',
    builder: {
        title: {
            describe: 'read note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

// console.log(yargs.argv);
yargs.parse()




