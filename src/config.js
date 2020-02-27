/**
 * Application configurations
 */

const config = {
    app: {
        title: 'Toy Robot Simulator'
    },

    /**
     * Configure the table surface
     */
    table: {
        startPointX: 0,
        endPointX: 4,
        startPointY: 0,
        endPointY: 4,
        lengthX: 5,
        lengthY: 5,
        movingUnit: 1
    },

    /**
     * Standard commands and arguments
     */
    cmd: {
        commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', 'QUIT'],
        directions: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
        initialCommand: 'PLACE'
    },

    /**
     * Logging levels
     */
    logging: {
        error: 'ERROR',
        warning: 'WARNING',
        debug: 'DEBUG',
        info: 'INFO',
        fatal:'FATAL'
    }
};

module.exports = config;
