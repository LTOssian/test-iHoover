import { Controller } from "./Controller";
import * as readline from 'readline';
import { Orientation } from "./iHoover";

interface UserInputs {
    roomLength: number;
    roomWWidth: number;
    robotPosX: number;
    robotPosY: number;
    robotOrientation: Orientation;
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