// Parse user arguments

import { upCommand } from '../upCommand/upCommand.js';

const inputParse = async (userInput) => {
    try {
        const userCommand = userInput.split(' ')[0];
        const commandHandler = {
            'up': upCommand,
        };

        if (commandHandler.hasOwnProperty(userCommand)) {
            commandHandler[userCommand](userInput);
        } else {
            console.log('\nwrong input');
            console.log(`\nYou are currently in ${process.cwd()}\n`);
        }
    } catch (err) {
        console.log('Operation failed inputParse');
    }
};

export { inputParse };

