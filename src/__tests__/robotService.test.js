const RobotService = require('../robotService');
const TerminalController = require('../terminalController');
const config = require('../config')

jest.mock('../terminalController'); // TerminalController is now a mock constructor

describe('Test RobotService class', () => {
    let robotService;
    const {logging: {error, fatal}} = config;

    beforeAll(() => {
        TerminalController.mockClear();
    });

    beforeEach(() => {
        robotService = new RobotService();
    });

    describe('Test place() method', () => {
        test('should return null and print out \'Invalid position.\' if either position property is empty', () => {
            const emptyX = '', emptyY = '', emptyDirection = '';
            const expectedMessgeToCall = 'Invalid position.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robotService.place(emptyX, emptyY, emptyDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);

            expect(robotService.place(1, emptyY, emptyDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(2);

            expect(robotService.place(emptyX, 1, emptyDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(3);

            expect(robotService.place(emptyX, emptyY, 'NORTH')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(4);

            expect(robotService.place(emptyX, 1, 'NORTH')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(5);

            expect(robotService.place(1, emptyY, 'NORTH')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(6);

            expect(robotService.place(1, 1, emptyDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(7);
        });

        test('should return null and print out \'X and Y must be integers.\' if either coordinate property is not an integer', () => {
            const floatX = 1.1, floatY = 2.2, direction = 'NORTH';
            const expectedMessgeToCall = 'X and Y must be integers.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robotService.place(floatX, floatY, direction)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);

            expect(robotService.place(1, floatY, direction)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(2);

            expect(robotService.place(floatX, 1, direction)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(3);
        });

        test('should return null and print out \'Invalid direction. The direction must be either NORTH,EAST,SOUTH,WEST.\' if an invalid direction provided', () => {
            const validX = 1, validY = 2;
            const expectedMessgeToCall = 'Invalid direction. The direction must be either NORTH,EAST,SOUTH,WEST.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robotService.place(validX, validY, 'n')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);

            expect(robotService.place(validX, validY, 'random')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(2);

            expect(robotService.place(validX, validY, '1')).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(3);

            expect(robotService.place(validX, validY, 1)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(error);
            expect(mockPrintMessage).toHaveBeenCalledTimes(4);
        });

        test('should return null and print out \'Prohibited position. The position is outside the table and the robot will fall.\' if a coordinate provided is out of the range', () => {
            const validDirection = 'NORTH';
            const expectedMessgeToCall = 'Prohibited position. The position is outside the table and the robot will fall.';

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;

            expect(robotService.place(-1, 0, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);

            expect(robotService.place(5, 0, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(2);

            expect(robotService.place(0, -1, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(3);

            expect(robotService.place(0, 5, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(4);

            expect(robotService.place(-1, 5, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(5);

            expect(robotService.place(6, -2, validDirection)).toBeNull();
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
            expect(mockPrintMessage).toHaveBeenCalledTimes(6);
        });

        it('should return a array contain \'x\', \'y\', and \'direction\' if the valid position provided', () => {
            const validX = 3, validY = 4, validDirection = 'EAST';
            expect(robotService.place(validX, validY, validDirection)).toEqual([validX, validY, validDirection]);
        })
    });

    describe('Test move() method', () => {
        test('should return current coordinate and print out \'Prohibited position. The position is outside the table and the robot will fall.\' if the robot is potentially moving outside the table in next step', () => {
            const expectedMessgeToCall = 'Prohibited position. The position is outside the table and the robot will fall.';


            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;
            let mockPrintMessageBeCalledTimes = 0;

            // move outside the grid in north side
            [0, 1, 2, 3, 4].forEach(x => {
                expect(robotService.move(x, 4, 'NORTH')).toEqual([x, 4]);
                expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
                expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
                expect(mockPrintMessage).toHaveBeenCalledTimes(++mockPrintMessageBeCalledTimes);
            });

            // move outside the grid in east side
            [0, 1, 2, 3, 4].forEach(y => {
                expect(robotService.move(4, y, 'EAST')).toEqual([4, y]);
                expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
                expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
                expect(mockPrintMessage).toHaveBeenCalledTimes(++mockPrintMessageBeCalledTimes);
            });

            // move outside the grid in south side
            [0, 1, 2, 3, 4].forEach(x => {
                expect(robotService.move(x, 0, 'SOUTH')).toEqual([x, 0]);
                expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
                expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
                expect(mockPrintMessage).toHaveBeenCalledTimes(++mockPrintMessageBeCalledTimes);
            });

            // move outside the grid in west side
            [0, 1, 2, 3, 4].forEach(y => {
                expect(robotService.move(0, y, 'WEST')).toEqual([0, y]);
                expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
                expect(mockPrintMessage.mock.calls[0][1]).toEqual(fatal);
                expect(mockPrintMessage).toHaveBeenCalledTimes(++mockPrintMessageBeCalledTimes);
            });
        });

        test('should return new coordinate if the robot moved to other position within the grid', () => {
            [0, 1, 2, 3].forEach(y => {
                [0, 1, 2, 3, 4].forEach(x => {
                    expect(robotService.move(x, y, 'NORTH')).toEqual([x, y + 1]);
                });
            });

            [0, 1, 2, 3, 4].forEach(y => {
                [0, 1, 2, 3].forEach(x => {
                    expect(robotService.move(x, y, 'EAST')).toEqual([x + 1, y]);
                });
            });

            [1, 2, 3, 4].forEach(y => {
                [0, 1, 2, 3, 4].forEach(x => {
                    expect(robotService.move(x, y, 'SOUTH')).toEqual([x, y - 1]);
                });
            });

            [0, 1, 2, 3, 4].forEach(y => {
                [1, 2, 3, 4].forEach(x => {
                    expect(robotService.move(x, y, 'WEST')).toEqual([x - 1, y]);
                });
            });
        });

        test('should return current coordinate if the direction is no valid', () => {
            expect(robotService.move(1, 2, 'S')).toEqual([1, 2]);
        })
    });

    describe('Test left() method', () => {
        it('should return the new direction after turned left', () => {
            expect(robotService.left('NORTH')).toEqual('WEST');
            expect(robotService.left('EAST')).toEqual('NORTH');
            expect(robotService.left('SOUTH')).toEqual('EAST');
            expect(robotService.left('WEST')).toEqual('SOUTH');
        });
    });

    describe('Test right() method', () => {
        it('should return the new direction after turned right', () => {
            expect(robotService.right('NORTH')).toEqual('EAST');
            expect(robotService.right('EAST')).toEqual('SOUTH');
            expect(robotService.right('SOUTH')).toEqual('WEST');
            expect(robotService.right('WEST')).toEqual('NORTH');
        });
    });

    describe('Test report() method', () => {
        it('should print out the robot\'s position use report() method', () => {
            const x = 1, y = 2, direction = 'NORTH';
            const expectedMessgeToCall = `Current Robot's Position: ${x},${y},${direction}`;

            robotService.report(x, y, direction);

            // mock.instances is available with automatic mocks:
            const mockTerminalInstance = TerminalController.mock.instances[0];
            const mockPrintMessage = mockTerminalInstance.printMessage;
            expect(mockPrintMessage.mock.calls[0][0]).toEqual(expectedMessgeToCall);
            expect(mockPrintMessage.mock.calls[0][1]).toBeUndefined();
            expect(mockPrintMessage).toHaveBeenCalledTimes(1);
        });
    });
});
