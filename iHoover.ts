export class Room {
    private _x: number;
    private _y: number;
    private grid: Array<boolean[]> = [];
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        this.setGrid();
    }

    setGrid() {
        for(let i = 0; i < this._y; i++) {
            this.grid.push([])
            for(let j = 0; j < this._x; j++) {
                this.grid[i].push(false);
            }
        }
    }

    getRoomDimensions() {
        return {
            x: this._x,
            y: this._y
        };
    }

    getGrid() {
        return this.grid;
    }


}


export enum Orientation {
    N = "N",
    S = "S",
    E = "E",
    W = "W"
};

export class iHoover extends Room {
    private coord_x: number;
    private coord_y: number;
    // private instructions: string;
    private orientation: Orientation;
    constructor(room_x: number, room_y: number, robot_x: number, robot_y: number, orientation: Orientation) {
        super(room_x, room_y);
        this.coord_x = robot_x;
        this.coord_y = robot_y;
        this.orientation = orientation;
        this.setInitPosition(robot_x, robot_y);
    }

    private setInitPosition(init_x: number, init_y: number) {
        try {
        this.checkPosition()
        const roomDimensions = this.getRoomDimensions()
        this.getGrid()[roomDimensions.y - 1 - this.coord_y][this.coord_x] = true;
        console.log(this.getGrid().join('\r\n'));
        } catch(e) {
            console.error(e);
        }
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
            case 'N':
                this.orientation = Orientation.W
                break;
            case 'S':
                this.orientation = Orientation.E
                break;
            case 'E':
                this.orientation = Orientation.N
                break;
            case 'W': 
                this.orientation= Orientation.S
                break
        }
    }

    turnRight() {
        switch (this.orientation) {
            case 'N':
                this.orientation = Orientation.E
                break;
            case 'S':
                this.orientation = Orientation.W
                break;
            case 'E':
                this.orientation = Orientation.S
                break;
            case 'W': 
                this.orientation= Orientation.N
                break
        }

    }

    checkPosition(): boolean {
        if ((this.coord_x > (this.getRoomDimensions().x - 1)) 
            || (this.coord_x < 0) 
            || (this.coord_y < 0) 
            || this.coord_y > (this.getRoomDimensions().y - 1)) 
        {
            throw new Error("iHoover cannot atteign this position in the room.");
        }

        return true;
    }

    moveForward() {
        this.getGrid()[this.getRoomDimensions().y - 1 - this.coord_y][this.coord_x] = false;

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