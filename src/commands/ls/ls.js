import * as fs from 'node:fs/promises';
import { pwdPrompt } from '../../smallFunctions.js';

const lsCommand = async (userInput, userCommand) => {
    try {
        if (userInput !== userCommand) {
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }
        const curDir = process.cwd();
        const files = await fs.readdir(curDir, { withFileTypes: true });
        files.sort((a, b) => {
            const aIsDir = a.isDirectory();
            const bIsDir = b.isDirectory();

            if (aIsDir === bIsDir) {
                return a.name.localeCompare(b.name);
            } else {
                return aIsDir ? -1 : 1;
            }
        });
        const result = files.reduce((acc, file) => {
            const name = file.name;
            const type = (file.isDirectory()) ? 'folder' : 'file';
            return [...acc, { name, type }];
        }, []);
        process.stdout.write('\n');
        console.table(result);
        pwdPrompt();

    } catch (err) {
        console.log(err);
    }
};

export { lsCommand };