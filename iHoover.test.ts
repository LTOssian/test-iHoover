import { describe, expect, it } from 'vitest'
import { Orientation } from './iHoover';
import { iHoover } from './iHoover';


describe('iHoover initialization', () => {
    it('sets up the robot coordinates', () => {
        const robotTest = new iHoover(2, 2, 0, 0, Orientation.N);
        expect(robotTest.getCurrentPosition()).toEqual({x: 0, y: 0, orientation: Orientation.N});
    }),

    it('checks if the robot is placed within the room', () => {
        const robotTest = new iHoover(4, 4, 4, 4, Orientation.N);
        expect(robotTest).toThrowError(Error);
    })
})

describe('iHoover functionnality', () => {
    it('turns orientation to the right', () => {
        const robotTest = new iHoover(10, 10, 5, 5, Orientation.N);
        robotTest.turnRight();

        expect(robotTest.getCurrentPosition().orientation).toEqual(Orientation.E);
    })
    it('turns orientation to the left', () => {
        const robotTest = new iHoover(10, 10, 5, 5, Orientation.E);
        robotTest.turnLeft();

        expect(robotTest.getCurrentPosition().orientation).toEqual(Orientation.N);
    })
    it('moves forward in the right direction', () => {
        const robotTest = new iHoover(10, 10, 5, 5, Orientation.N);
        robotTest.moveForward();
        
        expect(robotTest.getCurrentPosition()).toEqual({x:5, y:6, orientation: Orientation.N})
    })
})

