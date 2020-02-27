const config = require('./config');
const os = require('os');
const fs = require('fs');
const readline = require('readline');

class TerminalController {
    constructor() {
        this.eol = os.EOL;
        this.stdin = process.stdin;
        this.stdout = process.stdout;
    }

    /**
     * Initialise the terminal
     */
    initialTerminal() {
        this.stdin.setEncoding('utf8');
        process.title = config.app.title; // Set the process title
        this.stdin.resume();
    };

    /**
     * Print out the application introduction to guide the user to use this program
     */
    printGuideline() {
        this.printMessage(`### ${config.app.title} ###`);
        this.printMessage(`This application allows you to use simple commands to simulate the robot movement on the virtual tabletop in dimension of ${config.table.lengthX}units X ${config.table.lengthY}units`);

        this.printNewLine();

        this.printMessage('Below is the list of all available commands');
        this.printMessage('$ PLACE 2,4,EAST   # set the current position the the robot with X,Y coordinate and the facing direction');
        this.printMessage('$ LEFT             # rotate the robot 90 degrees in anti-clockwise direction without change the robot\'s position');
        this.printMessage('$ RIGHT            # rotate the robot 90 degrees in clockwise direction without change the robot\'s position');
        this.printMessage(`$ MOVE             # move the robot ${config.table.movingUnit} unit forward in the facing direction`);
        this.printMessage('$ REPORT           # output the robot\'s current position and orientation');
        this.printMessage('$ QUIT             # quit the application');

        this.printNewLine();

        this.printMessage('Start to play the robot by typing your first command now!');

        this.printNewLine();
    };

    /**
     * Print out the message in the terminal
     * @param {string} message The message to show
     * @param {string} [level] The logging level
     */
    printMessage(message, level) {
        if (level) this.stdout.write(`[${level}] `);
        this.stdout.write(`${message}${this.eol}`);
    };

    /**
     * Output a new line in terminal
     */
    printNewLine() {
        this.stdout.write(`${this.eol}`);
    };

    /**
     * This callback is displayed as part of the readData function.
     * @callback readDataCallback
     * @param {string} data Input data from cli
     */
    /**
     * Read user's input from command line
     * @param {readDataCallback} callback This callback handles the data received from the command line
     */
    readData(callback) {
        this.stdin.on('data', callback);
    };

    /**
     * Terminate the terminal to exit the application
     */
    terminate() {
        process.exit();
    };

    /**
     * This listens to the exit events from the terminal
     */
    subscribeExitEvent() {
        process.on('exit', _ => this.printMessage('Bye!'));
    };

    /**
     * This callback is displayed as part of the readCommandsFromFile function.
     * @callback commandHandlerCallback
     * @param {string} data Input command line
     */
    /**
     * This reads and executes commands from a file following with terminating application
     *
     * It reads the file name in the argument from user prompt.
     * A file with commands will be opened referred to the file name
     * @param {commandHandlerCallback} commandHandler This callback handles the data received from the line in file
     */
    readCommandsFromFile(commandHandler) {
        const arg = process.argv.slice(2);
        const _this = this;

        if (arg.length) { // if an argument provided
            try {
                // check if the file exists and readable
                fs.accessSync(arg[0], fs.constants.F_OK | fs.constants.R_OK)
            } catch (e) {
                _this.printMessage(`Failed to open the file, ${arg[0].toString('utf-8')}`, config.logging.error);
                this.terminate();
            }

            _this.printMessage(`-- Reading commands from a ${arg[0]} --`);

            const rl = readline.createInterface({
                input: fs.createReadStream(arg[0]),
                terminal: false
            });

            // Read each line from the file
            rl.on('line', function (line) {
                _this.printMessage(line); // output the line
                commandHandler(line);
            });

            // Close the stream and terminate application after the file has been read
            rl.on('close', function () {
                rl.close();
                _this.terminate();
            });
        }
    }
}

module.exports = TerminalController;
