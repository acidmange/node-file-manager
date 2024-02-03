// Change current directory to provided directory
import * as path from 'node:path';
import { pwdPrompt } from '../smallFunctions.js';

const cdCommand = async (userInput) => {
    try {
        const trueFormat = userInput.startsWith(`cd `);
        const secondArg = userInput.slice(3);
        const hasBackSlash = secondArg.includes(`\\`);
        const hasSpaces = secondArg.includes(` `);
        let newSecArg;

        if ((!trueFormat) || ((!hasBackSlash) && (hasSpaces))) {
            console.log('\nwrong input\n');
            pwdPrompt();
            return;
        }

        newSecArg = (hasBackSlash) ? secondArg.replaceAll('\\ ', ' ') : secondArg;
        const absolutePath = path.resolve(process.cwd(), newSecArg);
        process.chdir(absolutePath);
        pwdPrompt();

    } catch (err) {
        console.log('\nOperation failed');
        pwdPrompt();
    }
};

export { cdCommand };