var canvas = document.getElementById('ballsBox');
var ctx = canvas.getContext('2d');
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;

var directions = ["up-right", "up-left", "down-left", "down-right"];
var circles = [];
var id = 0;

canvas.height = 400;
canvas.width = 400;

function addNewBall(e) {
    const clickPos = {
        x: e.clientX - offsetX,
        y: e.clientY - offsetY
    };
    circles.forEach(circle => {
        if (isIntersect(clickPos,circle)) {
            console.log(circle);
            circles.splice(circle); // remove ball once you clicked on it
            return;
        }
    });
    var min = 10;
    var max = canvas.height-10;
    var cx = Math.floor(Math.random() * (max - min + 1)) + min;
    var cy = Math.floor(Math.random() * (max - min + 1)) + min;
    var r = 10;
    var color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    ctx.fillStyle = color;
    const circle = new Path2D();
    circle.arc(cx, cy, r, 0, 2 * Math.PI, false);
    ctx.fill(circle);
    var obj = {}; 
    obj['x'] = cx;
    obj['y'] = cy;
    obj['id'] = id;
    obj['color'] = color;
    var dir = directions[Math.floor(Math.random()*directions.length)];
    obj['dir'] = dir;
    obj['collisions'] = 0;
    id++;
    circles.push(obj);
    update();
}

function isIntersect(point, circle) {
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < 10;
}

function update(){
    circles.forEach (circle => {
        move(circle);
    });
    ctx.clearRect(0,0,400,400);
    circles.forEach (circle => {
        ctx.beginPath();
        ctx.fillStyle = circle.color;
        const cir = new Path2D();
        cir.arc(circle.x,circle.y,10,0,Math.PI*2);
        ctx.fill(cir);
    });

    setTimeout(update,100);
}

function move(circle) {
    y = circle.y;
    x = circle.x;
    circles.forEach(ball => {
        if (isColided(ball, circle) && ball.id != circle.id) {
            colide(ball, circle);
        }
    });
    if (circle.dir === "up-right") {
        if (x + 1 < 390 && y + 1 < 390){
            circle.y = y + 1;
            circle.x = x + 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "up-left") {
        if (x - 1 > 10 && y + 1 < 390){
            circle.y = y + 1;
            circle.x = x - 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "down-left") {
        if (x - 1 > 10 && y - 1 > 10){
            circle.y = y - 1;
            circle.x = x - 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "down-right") {
        if (x + 1 < 390 && y - 1 > 10){
            circle.y = y - 1;
            circle.x = x + 1;
        }
        else{
            changeDir(circle);
        }
    }
}

function isColided(circleA, circleB) {
    return Math.sqrt((circleA.x-circleB.x) ** 2 + (circleA.y - circleB.y) ** 2) < 22;
}

function colide(ballA, ballB) {
    var newDir = directions[Math.floor(Math.random()*directions.length)];
    ballA.dir = newDir;
    ballB.dir = oppositeDir(newDir);
    var collisionsA = ballA.collisions;
    var collisionsB = ballB.collisions;
    ballA.collisions = collisionsA + 1;
    ballB.collisions = collisionsB + 1;
}

function changeDir(circle) {
    if (circle.dir === "up-right") {
        if (x + 1 >= 390 && y + 1 >= 390) {
            circle.dir = "down-left";
        }
        else if (x + 1 >= 390) {
            var allowedDirections = ["up-left", "down-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y + 1 >= 390) {
            var allowedDirections = ["down-left", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "up-left") {
        if (x - 1 <= 10 && y + 1 >= 390) {
            circle.dir = "down-right";
        }
        else if (x - 1 <= 10) {
            var allowedDirections = ["up-right", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y + 1 >= 390) {
            var allowedDirections = ["down-left", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "down-right") {
        if (x + 1 >= 390 && y - 1 <= 10) {
            circle.dir = "up-left";
        }
        else if (x + 1 >= 390) {
            var allowedDirections = ["up-left", "down-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y - 1 <= 10) {
            var allowedDirections = ["up-right", "up-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "down-left") {
        if (x - 1 <= 10 && y - 1 <= 10) {
            circle.dir = "up-right";
        }
        else if (x - 1 <= 10) {
            var allowedDirections = ["up-right", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y - 1 <= 10) {
            var allowedDirections = ["up-right", "up-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
}

function oppositeDir (dir) {
    if (dir == "up-right") {
        return "down-left";
    }
    else if (dir == "down-left") {
        return "up-right";
    }
    else if (dir == "up-left") {
        return "down-right";
    }
    else if (dir == "down-right") {
        return "up-left";
    }
}