var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var draw = false  ;
var beginPosition = {"x": undefined, "y": undefined};
var eraserEnabled = false;

window.onresize = function(){
    resize();
}

function resize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

// 画圈
function drawArc(c, x, y, r){
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 4);
    ctx.fill();
}

function eraserRect(x, y){
    ctx.fillStyle = "wihte"
    ctx.clearRect(x-5, y-5, 10, 10);

}

// 画线
function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 10;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath()
}

function drawingBoard(){
    canvas.onmousedown = function(a){
        draw = true
        drawArc("black", a.clientX, a.clientY, 5)
        beginPosition = {"x": a.clientX, "y": a.clientY}
    
    }
    canvas.onmousemove = function(a){
        if (draw) {
            if (eraserEnabled){
                eraserRect(a.clientX, a.clientY);
            }else {
                drawArc("black", a.clientX, a.clientY, 5);
                // 连线
                drawLine(beginPosition["x"], beginPosition["y"], a.clientX, a.clientY)
                beginPosition = {"x": a.clientX, "y": a.clientY}
            }
        }
    }
    canvas.onmouseup = function(a){
        draw = false
    }
    
}


function switchButton(){
    var eraser = document.getElementById("eraser")
    var painting = document.getElementById("painting")

    eraser.className = "bt show"
    eraser.onclick = function(){
        eraserEnabled = true;
        eraser.className = "bt"
        painting.className = "bt show"
    }
    painting.onclick = function(){
        eraserEnabled = false;
        eraser.className = "bt show"
        painting.className = "bt"
    }
}


resize();
drawingBoard()
switchButton()

