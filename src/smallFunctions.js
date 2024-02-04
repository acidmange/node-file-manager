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
        console.log('\nwrong input\n');
        pwdPrompt();
        return;
    }
 
    return (hasBackSlash) ? secondArg.replaceAll('\\ ', ' ') : secondArg;
};

export { pwd, prompt, pwdPrompt, resolveInput };