const config = require('./config');
const validator = require('./validator');
const RobotService = require('./robotService');
const TerminalController = require('./terminalController');

/**
 * The class defines the robot and all its operations.
 */
class RobotController {
    constructor() {
        this.x = null;  // x coordinate of robot position
        this.y = null;  // y coordinate of robot position
        this.direction = null;   // facing direction of robot position
        this.intialCommand = true;
        this.terminal = new TerminalController();
        this.robotService = new RobotService();
    }

    /**
     * To execute command received from user prompt
     * @param {string} command The command input read from cli
     */
    execute(command) {
        const {logging: {error, warning}} = config;
        const {cmd, x, y, direction} = this._parser(command);

        // validate incoming command
        if (!validator.isValidCommand(cmd)) {
            return this.terminal.printMessage('Unknown command. Please check the usage.', error);
        }

        // the quit command should be executable in any time prior to other commands.
        if (cmd.toUpperCase() === 'QUIT') {
            return this._action(cmd);
        }

        if (this.intialCommand && !validator.isValidInitialCommand(cmd)) {
            return this.terminal.printMessage('The robot is not placed on the table yet. Using "PLACE X,Y,DIRECTION" to place it on the table.', warning);
        }

        return this._action(cmd, x, y, direction);
    }

    /**
     * To operate the command along with corresponding position details
     * @param {string} cmd The operation command to execute
     * @param {number} [x] The x coordinate of robot position
     * @param {number} [y] The y coordinate of robot position
     * @param {string} [direction] The facing direction of robot position
     * @private
     */
    _action(cmd, x, y, direction) {
        switch (cmd.toUpperCase()) {
            // Terminate the application
            case 'QUIT': {
                this.terminal.terminate();
                break;
            }

            // Place the robot on the table
            case 'PLACE': {
                const position = this.robotService.place(x, y, direction);
                if (position !== null) {
                    [this.x, this.y, this.direction] = position;
                    this.intialCommand = false;
                }
                break;
            }

            // Move robot forward in facing direction by the default moving unit
            case 'MOVE': {
                [this.x, this.y] = this.robotService.move(this.x, this.y, this.direction);
                break;
            }

            // Robot turns left by 90 degrees in anti-clockwise direction
            case 'LEFT': {
                this.direction = this.robotService.left(this.direction);
                break;
            }

            // Robot right left by 90 degrees in clockwise direction
            case 'RIGHT': {
                this.direction = this.robotService.right(this.direction);
                break;
            }

            // Print out robot's current position
            case 'REPORT': {
                this.robotService.report(this.x, this.y, this.direction);
                break;
            }

            default:
                break;
        }
    }

    /**
     * Parse the command by extracting operation command and position information
     * @param {string} input The command passed into which containing x, y, direction
     * @returns {{}||{cmd}||{cmd: string, x: number, y: number, direction: string}} Return an object with cmd, x, y, direction properties
     * @private
     */
    _parser(input) {
        if (validator.isEmpty(input)) {
            return {};
        }

        const [cmd, args] = input.trim().toUpperCase().split(' ');

        if (validator.isEmpty(args)) {
            return {cmd};
        }

        const [x, y, direction] = args.split(',');
        return {cmd, x, y, direction};
    }
}

module.exports = RobotController;
