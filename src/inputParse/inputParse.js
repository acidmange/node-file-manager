// Parse user arguments

import { upCommand } from '../upCommand/upCommand.js';
import { cdCommand } from '../cdCommand/cdCommand.js';
import { pwd } from '../smallFunctions.js';

const inputParse = async (userInput) => {
    try {
        const userCommand = userInput.split(' ')[0];
        const commandHandler = {
            'up': upCommand,
            'cd': cdCommand,
        };

        if (commandHandler.hasOwnProperty(userCommand)) {
            commandHandler[userCommand](userInput);
        } else {
            console.log('\nwrong input');
            pwd();
        }
    } catch (err) {
        console.log('Operation failed inputParse');
    }
};

export { inputParse };

