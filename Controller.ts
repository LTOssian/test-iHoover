import { Room } from "./Room";
import { Orientation, iHoover } from "./iHoover";

export class Controller {
    private room: Room
    private robot: iHoover;
    private instructions!: string[];

    constructor(roomDimX: number, roomDimY: number, robotInitX: number, robotInitY: number, robotOrientationInit: Orientation) {
        this.robot = new iHoover(robotInitX, robotInitY, robotOrientationInit);
        this.room = new Room(roomDimX, roomDimY);
        this.setRobotPosition();
    }

    private setRobotPosition() {
        try {
            this.checkRobotPosition()
            const roomDims = this.room.getRoomDimensions()
            const robotPos = this.robot.getCurrentPosition()
            this.room.getGrid()[roomDims.y - 1 - robotPos.y][robotPos.x] = 1;
        } catch(e) {
            console.error(e)
        }
    }

    private checkRobotPosition() {
        const roomDims = this.room.getRoomDimensions();
        const maxY = roomDims.y - 1;
        const maxX = roomDims.x - 1;

        const robotPos = this.robot.getCurrentPosition();

        const outOfRoom = (
            robotPos.x > maxX || 
            robotPos.x < 0 || 
            robotPos.y < 0 || 
            robotPos.y > maxY)

        if (outOfRoom) throw new Error("iHoover cannot atteign this position in the room.");
    }

    getRobotPosition() {
        return this.robot.getCurrentPosition();
    }

    setInstructions(instructions: string) {
        this.instructions = instructions.split('');
    }

    getInstructions() {
        return this.instructions;
    }

    launch() {
        this.instructions.forEach(instruction => {
            switch(instruction) {
                case 'D':
                    this.robot.turnRight();
                    break;
                case 'G':
                    this.robot.turnLeft();
                    break;
                case 'A':            
                    this.robot.moveForward();
                    this.checkRobotPosition();
                    break;
            }
        });

        console.log(this.getRobotPosition());
    }
}
