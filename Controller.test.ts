import { describe, expect, it } from 'vitest'
import { Controller } from './Controller';
import { Orientation } from './iHoover';

describe('Controller', () =>
{    describe ('Program initalization', () => {
        it('should set up the robot in the room', () => {
            const program = new Controller(2, 2, 0, 0, Orientation.N);

            expect(program.getRobotPosition()).toEqual({x: 0, y: 0, orientation: Orientation.N});
        }) 

        it('should throw an error if the robot is placed outsite the room', () => {
            const program = new Controller(2, 2, 3, 3, Orientation.N);
            
            expect(program).toThrow(Error);
        })
    });

    describe('Program instructions', () => {
        it('should correctly set instructions as array of instructions', () => {
          const program = new Controller(10, 10, 5, 5, Orientation.N);
          const instructions = 'ADG';
          const expectedInstructions = ["A", "D", "G"];
          program.setInstructions(instructions);
          
          expect(program.getInstructions()).toEqual(expectedInstructions);
      }) 

        it('should read the instructions and move the robot', () => {
            const program = new Controller(10, 10, 5, 5, Orientation.N);
            program.setInstructions('DADADADAAG');
            program.launch();

            expect(program.getRobotPosition()).toEqual({x: 5, y: 6, orientation: Orientation.W})
        })

        it('should throw an error if the instructions bring the robot out of the room', () => {
            const program = new Controller(2, 2, 0, 0, Orientation.N);
            program.setInstructions('AAA');
            
            expect(() => program.launch()).toThrow(Error);
        })
    })
});
