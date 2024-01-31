// This is program entry point

import process from 'node:process';
import { resolve } from 'node:path';
import os from 'node:os';

const cliStart = async () => {
    try {
        const userHomeDirectory = os.homedir();
        process.chdir(resolve(userHomeDirectory));

        const pattern = '--username=';
        const fArg = process.argv.slice(2).find((arg) => arg.startsWith(pattern));

        if (!fArg) {
            throw new Error('No username provided');
        }

        const userName = fArg.replace(pattern, '');

        console.log(`Welcome to the File Manager, ${userName}!\n`);
        console.log(`You are currently in ${process.cwd()}\n`);


        let exitRequest = false;

        process.on('SIGINT', () => {
            console.log(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
            process.exit(0);
        });

        while (!exitRequest) {
            console.log('Enter a command (e.g., cd path_to_directory or ".exit" to exit): \n');

            const userInput = await new Promise((resolve) => {
                process.stdin.once('data', (data) => resolve(data.toString().trim()));
            });

            console.log(`\nYou are currently in ${process.cwd()}\n`);

            switch (userInput) {
                case '.exit': {
                    exitRequest = true;
                    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
                    break;
                }
                default: {
                    console.log(`Invalid input\n`);
                }
            }
        }
    } catch (err) {
        throw new Error(err);
    } finally {
        process.exit(0);
    }
};

cliStart();