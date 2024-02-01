// Change current directory to upper directory

import process from 'node:process';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const upCommand = async (userInput) => {
    try {
        if (userInput !== 'up') {
            console.log('\nwrong input\n');
        } else {
            const currentDir = process.cwd();
            const systemPlatform = process.platform;
            let rootDir;
            let parentDir;

            if (systemPlatform === 'linux') {
                rootDir = path.resolve('/');
                parentDir = path.join(currentDir, '..');
            } else if (systemPlatform === 'win32') {
                const __dirname = path.dirname(fileURLToPath(import.meta.url));
                rootDir = path.parse(__dirname).root;
                parentDir = path.dirname(path.dirname(currentDir));
            } else {
                console.log('Your OS is not supported');
                process.exit(0);
            }

            if (currentDir !== rootDir) {
                process.chdir(parentDir);
                console.log(`\nYou are currently in ${process.cwd()}\n`);
            } else {
                console.log(`\nYou are currently in ${process.cwd()}\n`);
            }
        }
    } catch (err) {
        console.log('Operation failed');
        throw new Error(err);
    }
};

export { upCommand };