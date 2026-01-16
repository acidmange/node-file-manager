import * as path from 'node:path';
import * as fs from 'node:fs';
import { pwdPrompt, resolveArgs } from '../../smallFunctions.js';

const cpCommand = async (userInput, userCommand) => {
    try {
        let errorOccurred = false;

        if ((userInput === userCommand) && !errorOccurred) {
            errorOccurred = true;
            return { result: '\nInvalid input', err: 'yes' };
        }
        const userArgs = userInput.slice(userCommand.length + 1);
        const resolveArr = resolveArgs(userArgs);

        if (resolveArr.length === 0) {
            errorOccurred = true;
            return { result: '\nInvalid input', err: 'yes' }; 
        }

        const [firstArg, secondArg] = resolveArr;
        const oldFilePath = path.resolve(process.cwd(), firstArg);
        const newDirPath = path.resolve(process.cwd(), secondArg);
        const readStr = fs.createReadStream(oldFilePath);

        readStr.on('error', () => {
            if ((!errorOccurred) && (err.code === 'ENOENT')) {
                errorOccurred = true;
                return { result: '\nInvalid input', err: 'yes' }; 
            } else if (!errorOccurred) {
                errorOccurred = true;
                return { result: '\nOperation failed', err: 'yes' }; 
            }
        });

        const fileName = path.basename(oldFilePath);
        const newFilePath = path.resolve(newDirPath, fileName);
        const writeStr = fs.createWriteStream(newFilePath);
        
        readStr.pipe(writeStr);

        writeStr.on('finish', () => {
            if (!errorOccurred) {
                return { result: `${fileName} copied to ${newFilePath}`, err: 'no' }; 
            }
        });

        writeStr.on('error', (err) => {
            if ((err.code === 'EACCES') && (!errorOccurred)) {
                errorOccurred = true;
                return { result: `\nYou have no access to ${newDirPath}`, err: 'yes' }; 
            } else if ((err.code === 'ENOENT') && (!errorOccurred)) {
                errorOccurred = true;
                return { result: '\nInvalid input', err: 'yes' }; 
            } else if (!errorOccurred) {
                errorOccurred = true;
                return { result: '\nOperation failed', err: 'yes' }; 
            }
        });

    } catch (err) {
        errorOccurred = true;
        return { result: '\nOperation failed', err: 'yes' };
    }
};

export { cpCommand };