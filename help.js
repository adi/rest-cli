module.exports = function displayHelp(definedCommands) {
    const commandMaxLength = 16;
    for (const definedCommand of definedCommands) {
        const spacesLeft = commandMaxLength - definedCommand.name.length;
        console.info(`\t${definedCommand.name}${" ".repeat(spacesLeft+1)}${definedCommand.description}`);
    }    
}
