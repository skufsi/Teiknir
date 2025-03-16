var c = document.getElementById('drawingBoard');
var ctx = c.getContext('2d');

var shape = "box"; // týpa af formi
var startX; // start fyrir x-ás
var startY; // start fyrir y-ás
var sideA; // hlið a fyrir pýþagóras
var sideB; // hlið b fyrir pýþagóras
var radius; // radíus á hring
var width; // breidd kassa
var height; // hæð kassa
var color = "#000000" // upphafslitur
var fill = false; // fill byrjar slokkt
var lineSize = 1; // linuþykkt byrjar i 1


// stærð á teikniborði
ctx.canvas.width = 900;
ctx.canvas.height = 500;


c.addEventListener('mousedown', start); // fylgist með "mús niður" svarar "start"
c.addEventListener('mouseup', addShape); // fylgist með "mús upp" svarar "addShape"

// breytir notenda vali í týpu sem er valið
document.getElementById('circle').addEventListener('click', shapeToCircle);
document.getElementById('box').addEventListener('click', shapeToBox);
document.getElementById('line').addEventListener('click', shapeChange)
document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('color').addEventListener('input', colorChange);
document.getElementById('fillOption').addEventListener('change', fillChange);
document.getElementById('lineSize').addEventListener('change', lineChange);

function shapeChange(event) {
    shape = event.target.id;
    console.log("chosen form: ", shape)
}

function clearCanvas() { // hreinsir teikniborð
    ctx.clearRect(0, 0, c.width, c.height);
}

function shapeToCircle() { // breytir shape í hring
    shape = "circle";
}

function shapeToBox() { // breytir shape í kassa
    shape = "box";
}

function start(event) // fall sem finnur start á x og y ás
{

    startX = event.offsetX;
    startY = event.offsetY;
}

function fillChange(event) { // breytir í fill ef það er valið
    if (fill === true) {
        fill = false
    } else if (fill === false) {
        fill = true
    }
}

function colorChange(event) { // breytir í lit sem er valinn
    color = event.target.value;
}

function lineChange(event) { // breytir línuþykkt
    lineSize = parseInt(event.target.value);
}

function addShape(event) // bætir við formum
{
    switch (shape) {
        case "box":
            if (fill === true) { // kassi með fill
                width = event.offsetX - startX;
                height = event.offsetY - startY;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.rect(startX, startY, width, height);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
                break;
            } else if (fill === false) { // kassi ekki með fill
                width = event.offsetX - startX;
                height = event.offsetY - startY;
                ctx.strokeStyle = color;
                ctx.lineWidth = lineSize;
                ctx.beginPath();
                ctx.rect(startX, startY, width, height);
                ctx.stroke();
                ctx.closePath();
                break;
            }
        case "circle":
            if (fill === true) { // hringur með fill
                sideA = event.offsetX - startX;
                sideB = event.offsetY - startY;
                radius = Math.sqrt(sideA * sideA + sideB * sideB);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
                break;
            } else if (fill === false) { // hringur ekki með fill
                sideA = event.offsetX - startX;
                sideB = event.offsetY - startY;
                radius = Math.sqrt(sideA * sideA + sideB * sideB);
                ctx.strokeStyle = color;
                ctx.lineWidth = lineSize;
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
                break;
            }
        case "line": // bein lína
            endOfX = event.offsetX;
            endOfY = event.offsetY;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endOfX, endOfY);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineSize;
            ctx.stroke();
            ctx.closePath();
            break;
    }
}