// Change current directory to upper directory

import process from 'node:process';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { pwdPrompt } from '../../smallFunctions.js';

const upCommand = async (userInput, userCommand) => {
    try {
        if (userInput !== userCommand) {
            console.log('\nInvalid input\n');
            process.exit(0);
        }
        const currentDir = process.cwd();
        const systemPlatform = process.platform;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        let rootDir;
        let parentDir;

        switch (systemPlatform) {
            case 'linux': {
                rootDir = path.resolve('/');
                parentDir = path.join(currentDir, '..');
                break;
            }
            case 'win32': {
                rootDir = path.parse(__dirname).root;
                parentDir = path.dirname(currentDir);
                break;
            }
            case 'darwin': {
                rootDir = path.resolve('/');
                parentDir = path.dirname(currentDir);
                break;
            }
            default: {
                console.log('Your OS is not supported');
                process.exit(0);
            }
        }

        if (currentDir !== rootDir) {
            process.chdir(parentDir);
            pwdPrompt();
        } else {
            pwdPrompt();
        }
    } catch (err) {
        console.log('Operation failed');
        throw new Error(err);
    }
};

export { upCommand };