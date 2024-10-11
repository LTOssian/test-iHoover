import { Controller } from "./Controller";
import * as readline from 'readline';
import { Orientation } from "./iHoover";

interface UserInputs {
    roomLength: number;
    roomWidth: number;
    robotPosX: number;
    robotPosY: number;
    robotOrientation: Orientation;
    instructions: string;
}

class NumberInputValidator {
    static validateNumber = (input: string): boolean => {
        const parsedNum = parseInt(input);
        return !isNaN(parsedNum);
    }
}

class InputPrompter {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout      
        })
    }

    prompt(question: string): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(question, (answer) => {
                resolve(answer)
            })
        })
    }

    close(): void {
        this.rl.close();
    }
}

async function getInputs(): Promise<UserInputs | null> {
    const prompter = new InputPrompter();

    try {
        const roomLength = await prompter.prompt('Enter room\'s length: ');
        if (!NumberInputValidator.validateNumber(roomLength)) {
            throw new Error('Invalid room length. Must be a number.');
        }

        const roomWidth = await prompter.prompt('Enter room\'s width: ');
        if (!NumberInputValidator.validateNumber(roomWidth)) {
            throw new Error('Invalid room width. Must be a number.');
        }

        const robotPosX = await prompter.prompt('Enter robot\'s initial X position: ');
        if (!NumberInputValidator.validateNumber(robotPosX)) {
            throw new Error('Invalid robot\'s initial X. Must be a number.');
        }

        const robotPosY = await prompter.prompt('Enter robot\'s initial Y: ');
        if (!NumberInputValidator.validateNumber(robotPosY)) {
            throw new Error('Invalid robot\'s initial Y. Must be a number.');
        }

        const robotOrientation = (await prompter.prompt('Enter robot\'s inital orientation [N,E,W,S]: ')).toUpperCase() as Orientation;
        if (!Object.values(Orientation).includes(robotOrientation)) {
            throw new Error('Invalid Orientation. Must one of N, E, W, S');
        }

        const instructions = (await prompter.prompt('Enter the robot\'s instructions to perform (list of [D,G,A]): ')).toUpperCase();
        if (!(/^[DGA]+$/.test(instructions))) {
            throw new Error('Invalid instructions. Only commands available are D, G, A');
        }

        return {
            roomLength: parseInt(roomLength),
            roomWidth: parseInt(roomWidth),
            robotPosX: parseInt(robotPosX),
            robotPosY: parseInt(robotPosY),
            robotOrientation: robotOrientation,
            instructions: instructions
        }
    } catch(e) {
        console.error(e)
        return null
    } finally {
        prompter.close();
    }
}

async function main() {
    const inputsValues: UserInputs | null = await getInputs();
    if (inputsValues) {
        try {
            const program = new Controller(inputsValues.roomWidth, inputsValues.roomLength, inputsValues.robotPosX, inputsValues.robotPosY, inputsValues.robotOrientation);
            program.setInstructions(inputsValues.instructions);
            program.launch();
            
        } catch(e) {
            console.error(e);
        }
    } 
}

main()

