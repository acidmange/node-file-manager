import fs from 'fs/promises';
import { pwdPrompt, resolveInput } from '../../smallFunctions.js';

const addCommand = async (userInput, userCommand) => {
    try {
        if (userInput === userCommand) {
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }

        const secondArg = resolveInput(userInput, userCommand);

        await fs.writeFile(secondArg, '');

        console.log(`\nFile "${secondArg}" created successfully`);  
        pwdPrompt();

    } catch (err) {
        console.log('\nInvalid input');
        pwdPrompt();
    }
};

export { addCommand };