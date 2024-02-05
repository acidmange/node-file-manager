import * as path from 'node:path';
import { pwdPrompt, resolveArgs } from '../../smallFunctions.js';
import * as fs from 'node:fs';

const rnCommand = async (userInput, userCommand) => {
    try {
        if (userInput === userCommand) {
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
        const absolutePath = path.resolve(process.cwd(), firstArg);
        const newAbsolutePath = path.resolve(path.dirname(absolutePath), secondArg);

        fs.stat(absolutePath, (_oldPathErr, stats) => {
            if (!stats) {
                console.log('\nInvalid input');
                pwdPrompt();
                return;
            } else {
                fs.open(newAbsolutePath, (newPathErr) => {
                    if (newPathErr) {
                        fs.rename(absolutePath, newAbsolutePath, (renameErr) => {
                            if (renameErr) {
                                console.log('\nOperation failed');
                                pwdPrompt();
                                return;
                            } else {
                                console.log(`\n${firstArg} sucesfully renamed to ${secondArg}`); 
                                pwdPrompt();
                                return;
                            }
                        });
                    } else {
                        console.log('\nFile already exists');
                        pwdPrompt();
                        return;
                    }
                });
            }
        });

    } catch (err) {
        console.log('\nInvalid input rn');
        console.log(err);
        pwdPrompt();
    }
};

export { rnCommand };