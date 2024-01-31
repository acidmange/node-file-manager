// This is start program point

import process from 'node:process';

const argvArr = [...process.argv];

if (argvArr.length <= 2) {
    throw new Error('No arguments');
} else {
    const argumentsArr = argvArr.slice(2);
    const pattern = '--username=';
    const fArg = argumentsArr[0];

    if (!fArg.includes(pattern)) {
        throw new Error('Wrong arguments format');
    } else {
        const userName = fArg.replace(pattern, '');
        console.log(`Welcome to the File Manager, ${userName}!`);
    }
}