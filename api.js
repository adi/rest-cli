const help = require("./help");

module.exports = function runAPICommand(tool, command, commandArgs, genericDefinedCommands) {
    if (command === "help") {
        console.info(`Possible ${tool} commands are:`);
        const definedCommands = [...genericDefinedCommands];
        help(definedCommands);
    }
}
