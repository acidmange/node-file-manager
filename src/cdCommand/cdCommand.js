// Change current directory to provided directory
import * as path from 'node:path';
import { pwd } from '../smallFunctions.js';

const cdCommand = async (userInput) => {
    try {
        const trueFormat = userInput.startsWith(`cd `);
        const secondArg = userInput.slice(3);
        const hasBackSlash = secondArg.includes(`\\`);
        const hasSpaces = secondArg.includes(` `);
        let newSecArg;

        if ((!trueFormat) || ((!hasBackSlash) && (hasSpaces))) {
            console.log('\nwrong input\n');
            pwd();
            return;
        }

        newSecArg = (hasBackSlash) ? secondArg.replaceAll('\\ ', ' ') : secondArg;
        const absolutePath = path.resolve(process.cwd(), newSecArg);
        process.chdir(absolutePath);
        pwd();

    } catch (err) {
        console.log('\nOperation failed');
        pwd();
    }
};

export { cdCommand };