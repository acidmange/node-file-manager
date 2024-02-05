import * as path from 'node:path';
import * as fs from 'node:fs';
import { pwdPrompt, resolveArgs } from '../../smallFunctions.js';

const cpCommand = async (userInput, userCommand) => {
    try {
        let errorOccurred = false;

        if (userInput === userCommand) {
            errorOccurred = true;
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }

        const userArgs = userInput.slice(userCommand.length + 1);
        const resolveArr = resolveArgs(userArgs);

        if (resolveArr.length === 0) {
            return;
        }

        const [firstArg, secondArg] = resolveArr;
        const oldFilePath = path.resolve(process.cwd(), firstArg);
        const newDirPath = path.resolve(process.cwd(), secondArg);
        const readStr = fs.createReadStream(oldFilePath);

        readStr.on('error', () => {
            if (!errorOccurred) {
                errorOccurred = true;
                console.log('\nInvalid input');
                pwdPrompt();
                return;
            }
        });

        const fileName = path.basename(oldFilePath);
        const newFilePath = path.resolve(newDirPath, fileName);
        const writeStr = fs.createWriteStream(newFilePath);
        
        readStr.pipe(writeStr);

        writeStr.on('finish', () => {
            if (!errorOccurred) {
                console.log(`${fileName} copied to ${newFilePath}`);
                pwdPrompt();
                return;
            }
        });

        writeStr.on('error', (err) => {
            if ((err.code === 'EACCES') && (!errorOccurred)) {
                errorOccurred = true;
                console.log(`\nYou have no access to ${newDirPath}`);
                pwdPrompt();
                return;
            } else if (!errorOccurred) {
                errorOccurred = true;
                console.log('\nOperation failed', err);
                pwdPrompt();
                return;
            }
        });

    } catch (err) {
        console.log('\nOperation failed', err);
        console.log(err);
        pwdPrompt();
    }
};

export { cpCommand };