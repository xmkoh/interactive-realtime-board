import React from 'react';

import './style.css';

class Board extends React.Component {

    timeout;
    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);
        this.socket = this.props.socket

        var component = this;
        this.socket.on("canvas-data", function(data){
            var root = this;
            root.component = component
            var interval = setInterval(function(){
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                if(root.isDrawing) return;
                root.isDrawing = true;
                if(data === 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                clearInterval(interval);
                image.onload = function() {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.width);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 500)
        })
    }

    clearCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.socket.emit("canvas-data", 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    }
      
    componentDidMount() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        this.drawOnCanvas();
    }


    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d')
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('width'));
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        canvas.addEventListener("touchmove", function (e) {
            let touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
              });
            canvas.dispatchEvent(mouseEvent);
          }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            let touch = e.touches[0];
            mouse.x = touch.clientX - this.offsetLeft;
            mouse.y = touch.clientY - this.offsetTop;
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX - this.offsetLeft,
                clientY: touch.clientY - this.offsetTop
              });
            canvas.dispatchEvent(mouseEvent);
        }, false);


        canvas.addEventListener('click', function(e) {
            canvas.removeEventListener('mousemove', onPaint, false);
            onPaint();
        }, false);

        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            var mouseEvent = new MouseEvent("click", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);

        var root = this;
        var onPaint = function(e) {
            // e.preventDefault();
            // e.stopPropagation();
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            last_mouse.x =  mouse.x
            last_mouse.y =  mouse.y


            if(root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 100)
        };
    }

    render() {
        return (
            <div className="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}

export default Board