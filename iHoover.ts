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


