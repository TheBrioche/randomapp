class Maze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(1));
        this.stack = [];
        this.generateMaze();
    }

    generateMaze() {
        let start = { x: 1, y: 1 };
        this.grid[start.y][start.x] = 0;
        this.stack.push(start);

        while (this.stack.length > 0) {
            let current = this.stack[this.stack.length - 1];
            let neighbors = this.getUnvisitedNeighbors(current);

            if (neighbors.length > 0) {
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                this.grid[next.y][next.x] = 0;
                this.grid[(current.y + next.y) / 2][(current.x + next.x) / 2] = 0;
                this.stack.push(next);
            } else {
                this.stack.pop();
            }
        }
    }

    getUnvisitedNeighbors(cell) {
        let directions = [
            { x: 2, y: 0 }, { x: -2, y: 0 },
            { x: 0, y: 2 }, { x: 0, y: -2 }
        ];
        let neighbors = [];

        for (let dir of directions) {
            let nx = cell.x + dir.x, ny = cell.y + dir.y;
            if (nx > 0 && ny > 0 && nx < this.cols - 1 && ny < this.rows - 1 && this.grid[ny][nx] === 1) {
                neighbors.push({ x: nx, y: ny });
            }
        }
        return neighbors;
    }
}
