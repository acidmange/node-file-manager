// Parse user arguments

import { upCommand } from '../commands/upCommand/upCommand.js';
import { cdCommand } from '../commands/cdCommand/cdCommand.js';
import { lsCommand } from '../commands/lsCommand/lsCommand.js';
import { catCommand } from '../commands/catCommand/catCommand.js';
import { pwdPrompt } from '../smallFunctions.js';
import { addCommand } from '../commands/addCommand/addCommand.js';
import { rnCommand } from '../commands/rnCommand/rnCommand.js';
import { cpCommand } from '../commands/cpCommand/cpCommand.js';

const inputParse = async (userInput) => {
    try {
        const userCommand = userInput.split(' ')[0];
        const commandHandler = {
            'up': upCommand,
            'cd': cdCommand,
            'ls': lsCommand,
            'cat': catCommand,
            'add': addCommand,
            'rn': rnCommand,
            'cp': cpCommand,
        };

        if (commandHandler.hasOwnProperty(userCommand)) {
            commandHandler[userCommand](userInput, userCommand);
        } else {
            console.log('\nInvalid input');
            pwdPrompt();
        }
    } catch (err) {
        console.log('Operation failed');
    }
};

export { inputParse };

