const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const mazeRows = 21;
const mazeCols = 21;
canvas.width = mazeCols * tileSize;
canvas.height = mazeRows * tileSize;

let maze, player, enemy, exit;

// Initialize the game
function init() {
    maze = new Maze(mazeRows, mazeCols);
    player = { x: 1, y: 1 };
    enemy = { x: mazeCols - 2, y: mazeRows - 2 };
    exit = { x: mazeCols - 2, y: mazeRows - 2 };
    drawMaze();
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.rows; y++) {
        for (let x = 0; x < maze.cols; x++) {
            ctx.fillStyle = maze.grid[y][x] === 1 ? "black" : "white";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);

    // Draw enemy
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x * tileSize, enemy.y * tileSize, tileSize, tileSize);

    // Draw exit
    ctx.fillStyle = "green";
    ctx.fillRect(exit.x * tileSize, exit.y * tileSize, tileSize, tileSize);
}

document.addEventListener("keydown", (e) => movePlayer(e));

function movePlayer(e) {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp" || e.key === "w") newY--;
    if (e.key === "ArrowDown" || e.key === "s") newY++;
    if (e.key === "ArrowLeft" || e.key === "a") newX--;
    if (e.key === "ArrowRight" || e.key === "d") newX++;

    if (maze.grid[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }

    moveEnemy();
    checkWin();
    drawMaze();
}

function moveEnemy() {
    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;
    let moveX = enemy.x + (dx > 0 ? 1 : dx < 0 ? -1 : 0);
    let moveY = enemy.y + (dy > 0 ? 1 : dy < 0 ? -1 : 0);

    if (maze.grid[moveY][enemy.x] === 0) enemy.y = moveY;
    if (maze.grid[enemy.y][moveX] === 0) enemy.x = moveX;

    if (enemy.x === player.x && enemy.y === player.y) {
        alert("You were caught!");
        init();
    }
}

function checkWin() {
    if (player.x === exit.x && player.y === exit.y) {
        alert("You win!");
        init();
    }
}

// Restart button
document.getElementById("restart").addEventListener("click", init);

init();
