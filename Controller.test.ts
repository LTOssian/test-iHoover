import { describe, expect, it } from 'vitest'
import { Controller } from './Controller';
import { Orientation } from './iHoover';

describe ('Program initalization', () => {
    it('sets up the robot in the room', () => {
        const program = new Controller(2, 2, 0, 0, Orientation.N);

        expect(program.getRobotPosition()).toEqual({x: 0, y: 0, orientation: Orientation.N});
    }) 

    it('checks if the robot is placed within the room', () => {
        const program = new Controller(2, 2, 3, 3, Orientation.N);
        
        expect(program).toThrowError(Error);
    })

    it('reads the instructions and send the robot on its way', () => {
        const program = new Controller(10, 10, 5, 5, Orientation.N);
        program.setInstructions('DADADADAA');
        program.launch();

        expect(program.getRobotPosition()).toEqual({x: 5, y: 6, orientation: Orientation.N})
    })
});