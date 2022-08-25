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

    setTimeout(update,10);
}

function move(circle) {
    y = circle.y;
    x = circle.x;
    if (circle.dir === "up-right") {
        if (x + 1 < 400 && y + 1 < 400){
            circle.y = y + 1;
            circle.x = x + 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "up-left") {
        if (x - 1 > 0 && y + 1 < 400){
            circle.y = y + 1;
            circle.x = x - 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "down-left") {
        if (x - 1 > 0 && y - 1 > 0){
            circle.y = y - 1;
            circle.x = x - 1;
        }
        else{
            changeDir(circle);
        }
    }
    else if (circle.dir === "down-right") {
        if (x + 1 < 400 && y - 1 > 0){
            circle.y = y - 1;
            circle.x = x + 1;
        }
        else{
            changeDir(circle);
        }
    }
}

function changeDir(circle) {
    if (circle.dir === "up-right") {
        if (x + 1 >= 400 && y + 1 >= 400) {
            circle.dir = "down-left";
        }
        else if (x + 1 >= 400) {
            var allowedDirections = ["up-left", "down-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y + 1 >= 400) {
            var allowedDirections = ["down-left", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "up-left") {
        if (x - 1 <= 0 && y + 1 >= 400) {
            circle.dir = "down-right";
        }
        else if (x - 1 <= 0) {
            var allowedDirections = ["up-right", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y + 1 >= 400) {
            var allowedDirections = ["down-left", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "down-right") {
        if (x + 1 >= 400 && y - 1 <= 0) {
            circle.dir = "up-left";
        }
        else if (x + 1 >= 400) {
            var allowedDirections = ["up-left", "down-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y - 1 <= 0) {
            var allowedDirections = ["up-right", "up-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
    else if (circle.dir === "down-left") {
        if (x - 1 <= 0 && y - 1 <= 0) {
            circle.dir = "up-right";
        }
        else if (x - 1 <= 0) {
            var allowedDirections = ["up-right", "down-right"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
        else if (y - 1 <= 0) {
            var allowedDirections = ["up-right", "up-left"];
            var newDir = allowedDirections[Math.floor(Math.random()*allowedDirections.length)];
            circle.dir = newDir;
        }
    }
}
