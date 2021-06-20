var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var draw = false  ;
var beginPosition = {"x": undefined, "y": undefined};
var eraserEnabled = false;
var penColor = "red"
var penLineWidth = "10"


// 设置canvas的高度和宽度
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
    ctx.clearRect(x-penLineWidth, y-penLineWidth, penLineWidth*2, penLineWidth*2);

}

// 画线
function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = penColor;
    ctx.moveTo(x1, y1);
    ctx.lineWidth = penLineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath()
}

function drawingBoardWithMouse(){
    canvas.onmousedown = function(a){
        draw = true
        beginPosition = {"x": a.clientX, "y": a.clientY}
    }
    canvas.onmousemove = function(a){
        if (draw) {
            if (eraserEnabled){
                eraserRect(a.clientX, a.clientY);
            }else {
                drawArc(penColor, a.clientX, a.clientY, penLineWidth/2);
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


function drawingBoardWithTouch(){
    canvas.ontouchstart = function(e){
        draw = true
        beginPosition = {"x": e.touches[0].clientX, "y": e.touches[0].clientY}
    }
    
    canvas.ontouchmove = function(e){
        if (draw) {
            if (eraserEnabled){
                eraserRect(e.touches[0].clientX, e.touches[0].clientY);
            }else {
                drawArc(penColor, e.touches[0].clientX, e.touches[0].clientY, penLineWidth/2);
                // 连线
                drawLine(beginPosition["x"], beginPosition["y"], e.touches[0].clientX, e.touches[0].clientY)
                beginPosition = {"x": e.touches[0].clientX, "y": e.touches[0].clientY}
            }
        }
    }
    
    canvas.ontouchend = function(e){
        draw = false
    }
}


function clicks(){

    // 切换画笔和橡皮擦
    var pen = document.getElementById("pen")
    var eraser = document.getElementById("eraser")
    
    pen.onclick = function(e){
        eraserEnabled = false;
        pen.classList.add("active")
        eraser.classList.remove("active")
    }
    
    eraser.onclick = function(e){
        eraserEnabled = true;
        eraser.classList.add("active")
        pen.classList.remove("active")
    }
    
    // 切换颜色
    var red = document.getElementById("red")
    var green = document.getElementById("green")
    var yellow = document.getElementById("yellow")
    var black = document.getElementById("black")
    
    red.onclick = function(e) {
        red.classList.add("active");
        green.classList.remove("active");
        yellow.classList.remove("active");
        black.classList.remove('active')
        penColor = "red"
    }
    
    green.onclick = function(e){
        green.classList.add("active");
        red.classList.remove("active");
        yellow.classList.remove("active");
        black.classList.remove('active')
        penColor = "green"
    }
    
    yellow.onclick = function(e){
        yellow.classList.add("active");
        red.classList.remove("active");
        green.classList.remove("active");
        black.classList.remove('active')
        penColor = "yellow"
    }
    
    black.onclick = function(e){
        black.classList.add("active");
        red.classList.remove("active");
        green.classList.remove("active");
        yellow.classList.remove('active')
        penColor = "black"
    }
    
    // 清空画板
    clear = document.getElementById("clear")
    clear.onclick = function(e){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    }
    
    // 切换粗细
    var thick = document.getElementById("thick")
    var thin = document.getElementById("thin")

    thick.onclick = function(){
        thick.classList.add("active");
        thin.classList.remove("active");
        penLineWidth = 10;
    }
    thin.onclick = function(){
        thin.classList.add("active");
        thick.classList.remove("active");
        penLineWidth = 5;
    }
    
    // 下载
    var dw = document.getElementById("dw")
    dw.onclick = function(e){
        data = canvas.toDataURL("image/png");
        var a = document.createElement('a');
        a.href = data;
        a.download = "我的画画";
        document.body.appendChild(a);
        a.click();
    }
}



// 判断设备是否支持ontouchstart事件，能支持touch的，document.ontouchstart返回为null
if (document.ontouchstart === undefined){
    drawingBoardWithMouse()
}else{
    drawingBoardWithTouch();
}
resize();
clicks();