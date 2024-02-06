// Program entry point

import process from 'node:process';
import { resolve } from 'node:path';
import os from 'node:os';
import { inputParse } from '../inputParse/inputParse.js';
import { pwdPrompt } from '../smallFunctions.js';

const cliStart = async () => {
    try {
        const userHomeDirectory = os.homedir();
        process.chdir(resolve(userHomeDirectory));
        const pattern = '--username=';
        const fArg = process.argv.slice(2).find((arg) => arg.startsWith(pattern));

        if (!fArg) {
            console.log('No username provided, try again e.g.,\nnpm run start -- --username=your_username\n');
            process.exit(0);
        }

        const userName = fArg.replace(pattern, '');
        let exitRequest = false;
        console.log(`Welcome to the File Manager, ${userName}!`);
        pwdPrompt();

        process.on('SIGINT', () => {
            console.log(`\n\nThank you for using File Manager, ${userName}, goodbye!`);
            process.exit(0);
        });

        while (!exitRequest) {
            const userInput = await new Promise((resolve) => {
                process.stdin.once('data', (data) => resolve(data.toString().trim()));
            });  

            if (userInput === '.exit') {
                exitRequest = true;
                console.log(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
            } else {
                await inputParse(userInput);
            }
        }
    } catch (err) {
        throw new Error(err);
    } finally {
        process.exit(0);
    }
};

cliStart();