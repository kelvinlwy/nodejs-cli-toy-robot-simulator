const config = require('./config');

/**
 * To check whether the input is a string or not.
 * @param {string} input The input to evaluate
 * @returns {boolean} True if the input is a string, false otherwise
 * @private
 */
const _isString = (input) => {
    return typeof input === 'string';
};

/**
 * To check whether the input is an integer or not.
 * @param {number|string} input The input to evaluate
 * @returns {boolean} True if the input is an integer, false otherwise
 * @private
 */
const isInteger = (input) => {
    return Number.isInteger(parseInt(input)) && input % 1 === 0;
};

/**
 * To check whether the input is empty
 * @param input The input to evaluate
 * @returns {boolean} True if the input is either empty, null, or undefined, false otherwise
 */
const isEmpty = (input) => {
    return input !== 0 && !input;
};

/**
 * To check whether the command read from cli is one of the available commands
 * @param {string} cmd The command to evaluate
 * @returns {boolean} True if it is a valid command, false otherwise
 */
const isValidCommand = (cmd) => {
    const {cmd: {commands}} = config;

    return _isString(cmd) && commands.includes(cmd.toUpperCase());
};

/**
 * To check whether the initial command read from cli matched the launch command
 * @param {string} cmd The command to evaluate
 * @returns {boolean} True if it matches the launch command, false otherwise
 */
const isValidInitialCommand = (cmd) => {
    const {cmd: {initialCommand}} = config;

    return _isString(cmd) && cmd.toUpperCase() === initialCommand;
};

/**
 * To check whether the robot's x,y coordinate is within the range.
 * @param {string|number} x The x coordinate of current robot position
 * @param {string|number} y The y coordinate of current robot position
 * @returns {boolean} True if the robot is within the coordinate range, false otherwise
 * @throws {TypeError} throw an error if either arguments is not an integer
 */
const isOutOfRange = (x, y) => {
    const {table: {startPointX, startPointY, endPointX, endPointY}} = config;

    if (!isInteger(parseInt(x)) || !isInteger(parseInt(y))) {
        throw new TypeError(`Invalid type: coordinates must be integer.`);
    }

    return x < startPointX || x > endPointX || y < startPointY || y > endPointY;
};

/**
 * To check whether the direction provided is one of main directions
 * @param {string} direction The direction to evaluate
 * @returns {boolean} True if it's one of the main directions, false otherwise
 */
const isValidDirection = (direction) => {
    const {cmd: {directions}} = config;

    return _isString(direction) && directions.includes(direction.toUpperCase());
};

module.exports = {
    isValidCommand,
    isOutOfRange,
    isValidDirection,
    isValidInitialCommand,
    isEmpty,
    isInteger
};
