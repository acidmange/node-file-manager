// show file's content in console
import * as path from 'node:path';
import { pwdPrompt, resolveInput } from '../../smallFunctions.js';
import * as fsPromises from 'fs/promises';
import * as fs from 'node:fs';

const catCommand = async (userInput, userCommand) => {
    try {
        if (userInput === userCommand) {
            console.log('\nInvalid input');
            pwdPrompt();
            return;
        }
        const secondArg = resolveInput(userInput, userCommand);
        const absolutePath = path.resolve(process.cwd(), secondArg);
        const stat = await fsPromises.stat(absolutePath);
        const isDir = stat.isDirectory();

        if (isDir) {
            console.log('\nOperation failed');
            pwdPrompt();
            return;
        } else {
            const rStream = fs.createReadStream(absolutePath);
            const chunks = [];

            rStream.on('readable', () => {
                let chunk;
                while (null !== (chunk = rStream.read())) {
                    chunks.push(chunk);
                }
            });

            rStream.on('end', () => {
                const content = chunks.join('');
                process.stdout.write(`\n${content}`);
                pwdPrompt();
            });
        }

    } catch (err) {
        console.log('\nInvalid input');
        pwdPrompt();
    }
};

export { catCommand };