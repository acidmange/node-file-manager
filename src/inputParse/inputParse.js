// Parse user arguments

import { upCommand } from '../upCommand/upCommand.js';
import { cdCommand } from '../cdCommand/cdCommand.js';
import { lsCommand } from '../lsCommand/lsCommand.js';
import { pwdPrompt } from '../smallFunctions.js';

const inputParse = async (userInput) => {
    try {
        const userCommand = userInput.split(' ')[0];
        const commandHandler = {
            'up': upCommand,
            'cd': cdCommand,
            'ls': lsCommand,
        };

        if (commandHandler.hasOwnProperty(userCommand)) {
            commandHandler[userCommand](userInput);
        } else {
            console.log('\nwrong input');
            pwdPrompt();
        }
    } catch (err) {
        console.log('Operation failed inputParse');
    }
};

export { inputParse };

