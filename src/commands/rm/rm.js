import * as path from 'node:path';
import * as fs from 'node:fs';
import { pwdPrompt, resolveInput } from '../../smallFunctions.js';

const rmCommand = async (userInput, userCommand) => {
    try {
        let errorOccurred = false;
        if ((userInput === userCommand) && !errorOccurred) {
            errorOccurred = true;
            return { result: '\nInvalid input', err: 'yes' };
        }
        const secondArg = resolveInput(userInput, userCommand);
        if (!resolveInput) {
            errorOccurred = true;
            return { result: '\nInvalid input', err: 'yes' };
        }
        const filePath = path.resolve(process.cwd(), secondArg);
        const fileName = path.basename(filePath);

        fs.rm(filePath, (err) => {
            if (err && (!errorOccurred)) {
                errorOccurred = true;
                if (err.code === 'ENOENT') {
                    errorOccurred = true;
                    return { result: '\nInvalid input', err: 'yes' };
                } else {
                    errorOccurred = true;
                    return { result: '\nOperation failed', err: 'yes' };
                }
            } else if (!errorOccurred) {
                return { result: `\n${fileName} was sucessfuly removed`, err: 'yes'};
            }
        });

    } catch (err) {
        return { result: '\nOperation failed', err: 'yes' };
    }
};

export { rmCommand };