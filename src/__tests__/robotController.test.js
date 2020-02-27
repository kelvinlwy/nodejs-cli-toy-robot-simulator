const TerminalController = require('../terminalController');
const RobotController = require('../robotController');
const RobotService = require('../robotService');
const config = require('../config');

// TerminalController is now a mock constructor
jest.mock('../terminalController');

const mockPlace = jest.fn().mockImplementation((x, y, direction) => {
    return [x, y, direction];
});

const mockMove = jest.fn().mockImplementation((x, y, direction) => {
    return [x, y];
});

const mockLeft = jest.fn().mockImplementation((direction) => {
    return direction;
});

const mockRight = jest.fn().mockImplementation((direction) => {
    return direction;
});

const mockReport = jest.fn();

// RobotService is now a mock constructor
jest.mock('../robotService', () => {
    // Works and lets you check for constructor calls:
    return jest.fn().mockImplementation(() => {
        return {
            place: mockPlace,
            move: mockMove,
            left: mockLeft,
            right: mockRight,
            report: mockReport
        };
    });
});

describe('Test RobotController class', () => {
    let robot;
    const {logging: {error, warning}} = config;

    beforeAll(() => {
        TerminalController.mockClear();
        RobotService.mockClear();
    });

    beforeEach(() => {
        robot = new RobotController();
    });

    describe('Test private _parser() method', () => {
        test('should return empty object if the input is empty', () => {
            expect(robot._parser('')).toEqual({});
        });

        test('should return an object with \'cmd\' property', () => {
            const mockCommand = 'PLACE';
            expect(robot._parser(mockCommand)).toEqual({cmd: mockCommand});
        });

        test('should return an object with cmd, x, y, direction properties', () => {
            const mockOperator = 'PLACE';
            const mockArgument1 = '1';
            const mockArgument2 = '2';
            const mockArgument3 = 'NORTH';
            const mockCommand = `${mockOperator} ${mockArgument1},${mockArgument2},${mockArgument3}`;
            expect(robot._parser(mockCommand)).toEqual({
                cmd: mockOperator,
                x: mockArgument1,
                y: mockArgument2,
                direction: mockArgument3
            });
        });
    });

    describe('Test private _action() method', () => {
        test('should return invoke terminate call when execute QUIT command', () => {
            robot._action('QUIT');

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockTerminate = mockTerminalInstance.terminate;

            expect(mockTerminate).toHaveBeenCalledTimes(1);
        });

        test('should return invoke place call in RobotService when execute PLACE command', () => {
            robot._action('PLACE', 1, 1, 'NORTH');
            expect(mockPlace).toHaveBeenCalledTimes(1);
        });

        test('should return invoke move call in RobotService when execute MOVE command', () => {
            robot._action('MOVE');
            expect(mockMove).toHaveBeenCalledTimes(1);
        });

        test('should return invoke left call in RobotService when execute LEFT command', () => {
            robot._action('LEFT');
            expect(mockLeft).toHaveBeenCalledTimes(1);
        });

        test('should return invoke right call in RobotService when execute RIGHT command', () => {
            robot._action('RIGHT');
            expect(mockRight).toHaveBeenCalledTimes(1);
        });

        test('should return invoke report call in RobotService when execute REPORT command', () => {
            robot._action('REPORT');
            expect(mockReport).toHaveBeenCalledTimes(1);
        });
    });

    describe('Test execute() method', () => {
        test('should print out \'Unknown command. Please check the usage.\' if no valid command provided', () => {
            const expectedMessageToCall = 'Unknown command. Please check the usage.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robot.execute(''));
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessageToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);
        });

        test('should invoke terminate call in TerminalController when QUIT command passed into', () => {
            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockTerminate = mockTerminalInstance.terminate;

            expect(robot.execute('QUIT'));
            expect(mockTerminate).toHaveBeenCalledTimes(1);
        });

        test('should print out \'The robot is not placed on the table yet. Using "PLACE X,Y,DIRECTION" to place it on the table.\' if no valid launch command', () => {
            const expectedMessageToCall = 'The robot is not placed on the table yet. Using "PLACE X,Y,DIRECTION" to place it on the table.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robot.execute('MOVE'));
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessageToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(warning);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);
        });
    });
});
