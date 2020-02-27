const rewire = require('rewire');
const validator = require('../validator');

const {isOutOfRange, isValidCommand, isValidDirection, isValidInitialCommand, isEmpty, isInteger} = validator;
// using rewire to get into private resources;
const validatorRewire = rewire('../validator');
const isString = validatorRewire.__get__('_isString');

describe('Test validator module', () => {
    describe('Test the private _isString() function ', () => {
        it('should return false if input is not a string', () => {
            expect(isString(undefined)).toBeFalsy();
            expect(isString(null)).toBeFalsy();
            expect(isString(1)).toBeFalsy();
            expect(isString(Infinity)).toBeFalsy();
            expect(isString(() => {
            })).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString([])).toBeFalsy();
            expect(isString(false)).toBeFalsy();
        });

        it('should return true if input is a string', () => {
            expect(isString('This is string')).toBeTruthy();
        });
    });

    describe('Test the isInteger() function ', () => {
        it('should return false if input is not an integer', () => {
            expect(isInteger(undefined)).toBeFalsy();
            expect(isInteger(null)).toBeFalsy();
            expect(isInteger('string')).toBeFalsy();
            expect(isInteger(Infinity)).toBeFalsy();
            expect(isInteger(() => {
            })).toBeFalsy();
            expect(isInteger({})).toBeFalsy();
            expect(isInteger([])).toBeFalsy();
            expect(isInteger(false)).toBeFalsy();
            expect(isInteger(1.1)).toBeFalsy();
        });

        it('should return true if input is an integer', () => {
            expect(isInteger(1)).toBeTruthy();
            expect(isInteger(22)).toBeTruthy();
            expect(isInteger(333)).toBeTruthy();
        });
    });

    describe('Test isValidCommand() validator', () => {
        it('should return false if an invalid command provided', () => {
            expect(isValidCommand('a')).toBeFalsy();
            expect(isValidCommand('!')).toBeFalsy();
            expect(isValidCommand('random')).toBeFalsy();
            expect(isValidCommand('exit')).toBeFalsy();
        });

        it('should return true if an invalid command provided', () => {
            expect(isValidCommand('place')).toBeTruthy();
            expect(isValidCommand('PLACE')).toBeTruthy();
            expect(isValidCommand('PLacE')).toBeTruthy();
            expect(isValidCommand('move')).toBeTruthy();
            expect(isValidCommand('MOVE')).toBeTruthy();
            expect(isValidCommand('MoVe')).toBeTruthy();
            expect(isValidCommand('left')).toBeTruthy();
            expect(isValidCommand('LEFT')).toBeTruthy();
            expect(isValidCommand('LefT')).toBeTruthy();
            expect(isValidCommand('right')).toBeTruthy();
            expect(isValidCommand('RIGHT')).toBeTruthy();
            expect(isValidCommand('rIgHt')).toBeTruthy();
            expect(isValidCommand('quit')).toBeTruthy();
            expect(isValidCommand('QUIT')).toBeTruthy();
            expect(isValidCommand('qUiT')).toBeTruthy();
        })
    });

    describe('Test isValidInitialCommand() validator', () => {
        it('should return false if the command provided does not match the launch command', () => {
            expect(isValidInitialCommand('p')).toBeFalsy();
            expect(isValidInitialCommand('a')).toBeFalsy();
            expect(isValidInitialCommand('!')).toBeFalsy();
            expect(isValidInitialCommand('random')).toBeFalsy();
            expect(isValidInitialCommand('exit')).toBeFalsy();
            expect(isValidInitialCommand('move')).toBeFalsy();
            expect(isValidInitialCommand('MOVE')).toBeFalsy();
            expect(isValidInitialCommand('left')).toBeFalsy();
            expect(isValidInitialCommand('LEFT')).toBeFalsy();
            expect(isValidInitialCommand('right')).toBeFalsy();
            expect(isValidInitialCommand('RIGHT')).toBeFalsy();
            expect(isValidInitialCommand('quit')).toBeFalsy();
            expect(isValidInitialCommand('QUIT')).toBeFalsy();
        });

        it('should return true if the command provided matched the launch command', () => {
            expect(isValidInitialCommand('place')).toBeTruthy();
            expect(isValidInitialCommand('PLACE')).toBeTruthy();
            expect(isValidInitialCommand('PLacE')).toBeTruthy();
        })
    });


    describe('Test isOutOfRange() validator', () => {
        it('should return true if the coordinate provided is not within the defined range', () => {
            expect(isOutOfRange(-1, 0)).toBeTruthy();
            expect(isOutOfRange(-1, 5)).toBeTruthy();
            expect(isOutOfRange(0, 5)).toBeTruthy();
            expect(isOutOfRange(0, -1)).toBeTruthy();
            expect(isOutOfRange(5, -1)).toBeTruthy();
            expect(isOutOfRange(5, 0)).toBeTruthy();
            expect(isOutOfRange(-1, -1)).toBeTruthy();
            expect(isOutOfRange(5, 5)).toBeTruthy();
        });

        it('should return false if the coordinate provided is within the defined range', () => {
            [0, 1, 2, 3, 4].forEach(x => {
                [0, 1, 2, 3, 4].forEach(y => {
                    expect(isOutOfRange(x, y)).toBeFalsy();
                });
            });
        });

        it('should throw a TypeError if the coordinate provided with float value', async () => {
            try {
                await isOutOfRange(1.1, 1);
            } catch (e) {
                expect(e).toEqual({
                    error: 'Invalid type: coordinates must be integer.',
                });
                expect(e).toBeInstanceOf(TypeError);
            }

            try {
                await isOutOfRange(1, 2.3);
            } catch (e) {
                expect(e).toEqual({
                    error: 'Invalid type: coordinates must be integer.',
                });
                expect(e).toBeInstanceOf(TypeError);
            }
        });
    });

    describe('Test isValidDirection() validator', () => {
        it('should return false if the direction provided is not one of the accepted main directions', () => {
            expect(isValidDirection('random')).toBeFalsy();
            expect(isValidDirection('n')).toBeFalsy();
            expect(isValidDirection('N')).toBeFalsy();
            expect(isValidDirection('e')).toBeFalsy();
            expect(isValidDirection('E')).toBeFalsy();
            expect(isValidDirection('s')).toBeFalsy();
            expect(isValidDirection('S')).toBeFalsy();
            expect(isValidDirection('w')).toBeFalsy();
            expect(isValidDirection('W')).toBeFalsy();
            expect(isValidDirection('NORTHEAST')).toBeFalsy();
            expect(isValidDirection('NORTHWEST')).toBeFalsy();
            expect(isValidDirection('SOUTHEAST')).toBeFalsy();
            expect(isValidDirection('SOUTHWEST')).toBeFalsy();
        });

        it('should return true if the direction provided is one of the accepted main directions', () => {
            expect(isValidDirection('NORTH')).toBeTruthy();
            expect(isValidDirection('EAST')).toBeTruthy();
            expect(isValidDirection('SOUTH')).toBeTruthy();
            expect(isValidDirection('WEST')).toBeTruthy();
        });
    });

    describe('Test isEmpty() validator', () => {
        it('should return false if the input is not empty or null or undefined', () => {
            expect(isEmpty('1')).toBeFalsy();
            expect(isEmpty('a')).toBeFalsy();
            expect(isEmpty(0)).toBeFalsy();
        });

        it('should return true if the input is empty or null or undefined', () => {
            expect(isEmpty('')).toBeTruthy();
            expect(isEmpty(null)).toBeTruthy();
            expect(isEmpty(undefined)).toBeTruthy();
        });
    });
});
