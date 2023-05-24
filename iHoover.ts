export enum Orientation {
    N = "N",
    S = "S",
    E = "E",
    W = "W"
};

export class iHoover {
    private coord_x: number;
    private coord_y: number;
    private orientation: Orientation;
    constructor(robot_x: number, robot_y: number, orientation: Orientation) {
        this.coord_x = robot_x;
        this.coord_y = robot_y;
        this.orientation = orientation;
    }


    getCurrentPosition() {
        return {
            x: this.coord_x,
            y: this.coord_y,
            orientation: this.orientation
        }
    }

    turnLeft() {
        switch (this.orientation) {
            case Orientation.N :
                this.orientation = Orientation.W
                break;
            case Orientation.S :
                this.orientation = Orientation.E
                break;
            case Orientation.E :
                this.orientation = Orientation.N
                break;
            case Orientation.W : 
                this.orientation= Orientation.S
                break
        }
    }

    turnRight() {
        switch (this.orientation) {
            case Orientation.N :
                this.orientation = Orientation.E
                break;
            case Orientation.S :
                this.orientation = Orientation.W
                break;
            case Orientation.E :
                this.orientation = Orientation.S
                break;
            case Orientation.W : 
                this.orientation= Orientation.N
                break
        }
    }

    moveForward() {
        switch(this.orientation) {
            case "N":
                this.coord_y += 1;
                break;
            case "S":
                this.coord_y -= 1;
                break;

            case "E":
                this.coord_x += 1;
                break;
            case "W":
                this.coord_x -= 1;
        }
    }
}
