import * as path from 'node:path';
import * as fs from 'node:fs';
import { resolveArgs, pwdPrompt } from '../../smallFunctions.js';
import { cpCommand } from '../cp/cp.js';
import { rmCommand } from '../rm/rm.js';


const mvCommand = async (userInput, userCommand) => {
    //mv asd dsadas
    
    let errorOccurred = false;

    if ((userInput === userCommand) && !errorOccurred) {
        errorOccurred = true;
        return { result: '\nInvalid input', err: 'yes' };
    }

    const userArgs = userInput.slice(userCommand.length + 1); //asd dsadas
    const cpInput = `cp ${userArgs}`;
    const cpResultObj = await cpCommand(cpInput, 'cp');
    if (cpResult) {
        const resolveArr = resolveArgs(userArgs);
        const [firstArg] = resolveArr;
        const rmInput = `rm ${firstArg}`;
        const rmResultObj = rmCommand(rmInput, 'rm');

        if ((!errorOccurred) && (rmResultObj.err !== 'yes') && (cpResultObj.err !== 'yes')) {
            return { result: 'File was sucessfully moved', err: 'no'};
        } else {
            errorOccurred = true;
            return { result: '\nOperation failed', err: 'yes' };
        }
    }
};

export { mvCommand };