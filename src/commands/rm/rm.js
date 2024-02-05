import * as path from 'node:path';
import * as fs from 'node:fs';
import { pwdPrompt, resolveInput } from '../../smallFunctions.js';

const rmCommand = async (userInput, userCommand) => {
    try {
        let errorOccurred = false;
        if (userInput === userCommand) {
            errorOccurred = true;
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }
        const secondArg = resolveInput(userInput, userCommand);
        const filePath = path.resolve(process.cwd(), secondArg);
        const fileName = path.basename(filePath);

        fs.rm(filePath, (err) => {
            if (err) {
                errorOccurred = true;
                console.log('\nOperation failed');
                pwdPrompt();
                return;
            } else {
                console.log(`\n${fileName} was sucessfuly removed`);
                pwdPrompt();
                return;
            }
        });

    } catch (err) {
        console.log('\nOperation failed');
        pwdPrompt();
    }
};

export { rmCommand };