import { assert, describe, expect, it } from 'vitest'
import { Room } from './Room';

describe('Room flow', () => {
    it('sets up the grid vertically according to dimensions input', () => {
        const x = 10;
        const y = 5;
        const roomTest = new Room(x, y);

        expect(roomTest.getGrid().length).toEqual(y);
    });

    it('sets up the grid horizontally according to dimensions input', () => {
        const x = 10;
        const y = 5;
        const roomTest = new Room(x, y);

        expect(roomTest.getGrid()[0].length).toEqual(x);
    }) 

});
