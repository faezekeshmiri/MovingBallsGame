var canvas = document.getElementById('ballsBox');
var ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 400;

function addNewBall(e) {
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
}