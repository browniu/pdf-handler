const cvsDraw = document.getElementById('cvs-draw');

const ctxDraw = cvsDraw.getContext('2d');
ctxDraw.fillStyle='#FF0000';
ctxDraw.strokeStyle='#FF0000';

let painting = false;
let lastPoint = {x: undefined, y: undefined};

cvsDraw.onmousedown = e => {
    painting = true;
    const x = e.clientX;
    const y = e.clientY;
    lastPoint = {x, y};
    drawCircle(x, y, 0.1)
};
cvsDraw.onmousemove = e => {
    if (painting) {
        const x = e.clientX;
        const y = e.clientY;
        const newPoint = {x, y};
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint
    }
};
cvsDraw.onmouseleave = cvsDraw.onmouseup = () => painting = false;

function drawCircle(x, y, size) {
    ctxDraw.save();
    ctxDraw.beginPath();
    ctxDraw.arc(x, y, size, 0, Math.PI * 2);
    ctxDraw.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctxDraw.lineWidth = 1;
    ctxDraw.lineCap = 'round';
    ctxDraw.lineJoin = 'round';
    ctxDraw.moveTo(x1, y1);
    ctxDraw.lineTo(x2, y2);
    ctxDraw.stroke();
    ctxDraw.closePath()
}
