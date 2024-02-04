// Change current directory to provided directory
import * as path from 'node:path';
import { pwdPrompt, resolveInput } from '../smallFunctions.js';

const cdCommand = async (userInput, userCommand) => {
    try {
        if (userInput === userCommand) {
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }
        const secondArg = resolveInput(userInput, userCommand);
        const absolutePath = path.resolve(process.cwd(), secondArg);
        process.chdir(absolutePath);
        pwdPrompt();

    } catch (err) {
        console.log('\nInvalid input');
        pwdPrompt();
    }
};

export { cdCommand };