// Parse user arguments

import { upCommand } from '../commands/up/upCommand.js';
import { cdCommand } from '../commands/cd/cd.js';
import { lsCommand } from '../commands/ls/ls.js';
import { catCommand } from '../commands/cat/cat.js';
import { pwdPrompt } from '../smallFunctions.js';
import { addCommand } from '../commands/add/add.js';
import { rnCommand } from '../commands/rn/rn.js';
import { cpCommand } from '../commands/cp/cp.js';
import { rmCommand } from '../commands/rm/rm.js';

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
            'rm': rmCommand,
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

