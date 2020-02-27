const config = require('./config');
const validator = require('./validator');
const TerminalController = require('./terminalController');

/**
 * The service class define all robot's operations
 */
class RobotService {
    constructor() {
        this.terminal = new TerminalController();
    }

    /**
     * Place the robot on the virtual table with pos and the facing direction.
     * All invalid actions will be printed out in the terminal.
     *
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {string} direction The facing direction
     * @returns {null|*[x: number, y: number, direction: string]} Return new x coordinate, new y coordinate, and facing direction if the operation was executed, null otherwise.
     */
    place(x, y, direction) {
        const {cmd: {directions}, logging: {error, fatal}} = config;

        if (validator.isEmpty(x) || validator.isEmpty(y) || validator.isEmpty(direction)) {
            this.terminal.printMessage('Invalid position.', error);
            return null;
        } else if (!validator.isInteger(x) || !validator.isInteger(y)) {
            this.terminal.printMessage('X and Y must be integers.', error);
            return null;
        } else if (!validator.isValidDirection(direction)) {
            const directionsString = directions.join(',');
            this.terminal.printMessage(`Invalid direction. The direction must be either ${directionsString}.`, error);
            return null;
        } else if (validator.isOutOfRange(x, y)) {
            this.terminal.printMessage(`Prohibited position. The position is outside the table and the robot will fall.`, fatal);
            return null;
        } else {
            return [x, y, direction];
        }
    }

    /**
     * Move the robot forward in facing direction by defined moving unit.
     * The origin of the table map is 0,0 as south west most corner.
     * All invalid actions will be printed out in the terminal.
     *
     * @param {string|number} x The x coordinate
     * @param {string|number} y The y coordinate
     * @param {string} direction The facing direction
     * @returns {null|*[x: number, y: number]} Return new x coordinate, new y coordinate if the operation was executed, null otherwise.
     */
    move(x, y, direction) {
        const {table: {movingUnit}, logging: {fatal}} = config;
        let newX = parseInt(x);
        let newY = parseInt(y);

        switch (direction) {
            case 'NORTH':
                newY += movingUnit;
                break;
            case 'EAST':
                newX += movingUnit;
                break;
            case 'SOUTH':
                newY -= movingUnit;
                break;
            case 'WEST':
                newX -= movingUnit;
                break;
            default:
                return [x, y];
        }

        if (validator.isOutOfRange(newX, newY)) {
            this.terminal.printMessage(`Prohibited position. The position is outside the table and the robot will fall.`, fatal);
            return [x, y];
        } else {
            return [newX, newY];
        }
    }

    /**
     * Rotate the robot by 90 degrees in anti-clockwise direction from currect facing direction
     * @param {string} direction The facing direction
     * @returns {string} The new facing direction
     */
    left(direction) {
        const {cmd: {directions}, table: {movingUnit}} = config;
        const idx = directions.indexOf(direction);

        if (idx - movingUnit < 0) {
            return directions[directions.length - 1];
        } else {
            return directions[idx - movingUnit];
        }
    }

    /**
     * Rotate the robot by 90 degrees in clockwise direction from currect facing direction
     * @param {string} direction The facing direction
     * @returns {string} The new facing direction
     */
    right(direction) {
        const {cmd: {directions}, table: {movingUnit}} = config;
        const idx = directions.indexOf(direction);

        if (idx + movingUnit >= directions.length) {
            return directions[0];
        } else {
            return directions[idx + movingUnit];
        }
    }

    /**
     * Print out the robot's position
     * @param {string|number} x The x coordinate
     * @param {string|number} y The y coordinate
     * @param {string} direction The facing direction
     */
    report(x, y, direction) {
        this.terminal.printMessage(`Current Robot's Position: ${x},${y},${direction}`);
    }
}

module.exports = RobotService;
