import { describe, expect, it } from 'vitest'
import { Orientation } from './iHoover';
import { iHoover } from './iHoover';

// TODO: Improve coverage and add Theory InlineData
describe('iHoover functionnality', () => {
    it('should turn orientation to the right', () => {
        const robotTest = new iHoover(5, 5, Orientation.N);
        robotTest.turnRight();

        expect(robotTest.getCurrentPosition().orientation).toEqual(Orientation.E);
    })
    it('should turn orientation to the left', () => {
        const robotTest = new iHoover(5, 5, Orientation.E);
        robotTest.turnLeft();

        expect(robotTest.getCurrentPosition().orientation).toEqual(Orientation.N);
    })
    it('should move forward in the right direction', () => {
        const robotTest = new iHoover(5, 5, Orientation.N);
        robotTest.moveForward();
        
        expect(robotTest.getCurrentPosition()).toEqual({x:5, y:6, orientation: Orientation.N})
    })
})

