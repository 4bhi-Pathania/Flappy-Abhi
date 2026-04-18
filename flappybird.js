const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const jump = -8;
const pipeWidth = 50;
const gap = 150;

const playerImg = new Image();
playerImg.src = "myavatar.png";

const player = { x: 50, y: 300, width: 60, height: 60, dy: 0 };

let pipes = [];
let score = 0;
let gameOver = false;

pipes.push({
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - gap - 100) + 50)
});

document.addEventListener("keydown", () => {
    if (!gameOver) {
        player.dy = jump;
    } else {
        restartGame();
    }
});

function restartGame() {
    score = 0;
    gameOver = false;
    player.y = 300;
    player.dy = 0;
    pipes = [];

    pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * (canvas.height - gap - 100) + 50)
    });

    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.dy += gravity;
    player.y += player.dy;
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        p.x -= 2;

        ctx.fillStyle = "green";
        ctx.fillRect(p.x, 0, pipeWidth, p.y);
        ctx.fillRect(p.x, p.y + gap, pipeWidth, canvas.height - p.y - gap);

        if (
            player.x + 30 < p.x + pipeWidth &&
            player.x + player.width - 30 > p.x &&
            (player.y < p.y || player.y + player.height > p.y + gap)
        ) {
            gameOver = true;
        }

        if (p.x + pipeWidth < 0) {
            pipes.splice(i, 1);
            i--;
            score++;
        }
    }

    if (pipes[pipes.length - 1].x < canvas.width - 200) {
        pipes.push({
            x: canvas.width,
            y: Math.floor(Math.random() * (canvas.height - gap - 100) + 50)
        });
    }

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${score}`, 10, 25);

    if (player.y + player.height >= canvas.height || player.y <= 0) {
        gameOver = true;
    }

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", 80, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press any key to restart", 90, canvas.height / 2 + 40);
        return;
    }

    requestAnimationFrame(loop);
}

playerImg.onload = loop;
