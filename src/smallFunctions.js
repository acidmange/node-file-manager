const pwd = () => {
    console.log(`\nYou are currently in ${process.cwd()}\n`);
};

const prompt = () => {
    console.log('Enter a command (e.g., cd "path_to_directory") or exit (command .exit / Ctrl+C combination): \n');
};

const pwdPrompt = () => {
    pwd();
    prompt();
}

export { pwd, prompt, pwdPrompt };