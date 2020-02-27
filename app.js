#!/usr/bin/env node

/**
 * This is the entry point of the Toy Robot Simulator application which
 * allow commands from user prompt to simulate a toy robot movement on the virtual tabletop.
 *
 * This instantiates the terminalController to create the terminal instance and
 * uses it to manipulate the input, output, signals in terminal.
 * This also requires to the robotController to create the robot instance to execute commands.
 */

const TerminalController = require('./src/terminalController');
const RobotController = require('./src/robotController');

function main() {
    const terminal = new TerminalController();
    const robot = new RobotController();

    const executeCommand = cmd => {
        robot.execute(cmd);
    };

    terminal.initialTerminal();

    terminal.subscribeExitEvent();

    terminal.printGuideline();

    terminal.readData(executeCommand);

    terminal.readCommandsFromFile(executeCommand);
}

main();
