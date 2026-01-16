const pwd = () => {
    console.log(`\nYou are currently in ${process.cwd()}\n`);
};

const prompt = () => {
    console.log('Enter a command (e.g., cd "path_to_directory") or exit (command .exit / Ctrl+C combination): \n');
};

const pwdPrompt = () => {
    pwd();
    prompt();
};

const resolveInput = (userInput, userCommand) => {
    const secondArg = userInput.slice(userCommand.length + 1);
    const hasBackSlash = secondArg.includes(`\\`);
    const hasSpaces = secondArg.includes(' ');

    if ((!hasBackSlash) && (hasSpaces)) {
        return;
    }

    return (hasBackSlash) ? secondArg.replaceAll('\\ ', ' ') : secondArg;
};

const removeSlashes = (userArgs) => {
    return userArgs.replaceAll('\\ ', ' ');
};

const findSpaceInd = (argsInput) => {
    const midSymb = ' ';
    const corSymb = '\\\\';
    const regex = new RegExp(`(?<!${corSymb})${midSymb}(?!${corSymb})`, 'g');
    const index = argsInput.search(regex);
    const matchCount = (argsInput.match(regex) || []).length;
    console.log(matchCount);

    if (index !== -1 && matchCount === 1) {
        return index;
    } else {
        return;
    }
};

const resolveArgs = (userArgs) => {
    const hasBackSlash = userArgs.includes(`\\`);
    let fArg;
    let sArg;

    switch (hasBackSlash) {
        case false: {
            if (userArgs.split(' ').length !== 2) {
                return [];
            } else {
                [fArg, sArg] = userArgs.split(' ');
                break;
            }
        }
        default: {
            const spaceInd = findSpaceInd(userArgs);
            if (!spaceInd) {
                return [];
            } else {
                const argA = userArgs.slice(0, spaceInd);
                fArg = removeSlashes(argA);
                const argB = userArgs.slice(spaceInd + 1);
                sArg = removeSlashes(argB);
            }
        }
    }

    return [fArg, sArg];
};

export { pwd, prompt, pwdPrompt, resolveInput, findSpaceInd, removeSlashes, resolveArgs };