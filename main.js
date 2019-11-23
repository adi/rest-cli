#!/usr/bin/env node

const api = require("./api");
const help = require("./help");

const fs = require("fs");
const os = require("os");
const path = require("path");

const executablePath = process.argv[1];
const toolArgs = process.argv.slice(2);
const executableFilename = path.basename(executablePath);

const standardConfigDir = ".config";
const standardBinariesDir = "bin";
const toolName = "restcli";
const homeDir = os.homedir();

const configDir = path.join(homeDir, standardConfigDir, toolName);
fs.mkdirSync(configDir, { recursive: true });

const binariesDir = path.join(homeDir, toolName, standardBinariesDir);
fs.mkdirSync(binariesDir, { recursive: true });

const existingExecutablePaths = process.env["PATH"].split(":");
if (existingExecutablePaths.indexOf(binariesDir) === -1) {
    console.warn(`Could not detect binaries' directory (${binariesDir}) in $PATH. Baaad :-(`);
    console.warn(`Installling/uninstalling new API commands might not work !!!`);
}

if (toolArgs.length < 1) {
    console.error(`At least one argument is expected`);
    console.error(`Try running ${executableFilename} help`);
    process.exit(1);
}
const command = toolArgs[0];
const commandArgs = toolArgs.slice(1);

const genericDefinedCommands = [
    {
        name: "help",
        description: "Displays this helpful text",
    },
];

// If this is a defined REST API, call that
if (executableFilename !== toolName) {
    api(executableFilename, command, commandArgs, genericDefinedCommands);
    process.exit(0);
}

// Otherwise is the management interface
if (command === "help") {
    console.info(`Possible management commands are:`);
    const definedCommands = [...genericDefinedCommands];
    definedCommands.push({
        name: "install",
        description: "Installs a new API",
    });
    definedCommands.push({
        name: "uninstall",
        description: "Uninstalls an installed API",
    });
    definedCommands.push({
        name: "list",
        description: "Lists installed APIs",
    });
    help(definedCommands);
}
