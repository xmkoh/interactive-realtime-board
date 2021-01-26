import React from 'react';
import io from 'socket.io-client';

import './style.css';

class Board extends React.Component {

    timeout;
    socket =io.connect("https://quiet-ridge-74497.herokuapp.com/", {secure: true});

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);
    
        this.socket.on("connect", function(){
            // console.log("CONNECTED");
        })

        var component = this;
        this.socket.on("canvas-data", function(data){
            var root = this;
            root.component = component
            var interval = setInterval(function(){
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                if (data==='clear-data'){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return
                }
                image.onload = function() {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.width);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 100)
        })
    }

    clearCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.socket.emit("canvas-data", 'clear-data');
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
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        canvas.addEventListener("touchmove", function (e) {
            let touch = e.touches[0];
            mouse.x = touch.clientX - this.offsetLeft;
            mouse.y = touch.clientY - this.offsetTop;
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
          }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let touch = e.touches[0];
            last_mouse.x = touch.clientX - this.offsetLeft;
            last_mouse.y = touch.clientY - this.offsetTop ;
            canvas.addEventListener('touchmove', onPaint, false);
        }, false);


        canvas.addEventListener('click', function(e) {
            canvas.removeEventListener('mousemove', onPaint, false);
            onPaint();
        }, false);

        canvas.addEventListener('touchend', function(e) {
            canvas.removeEventListener('mousemove', onPaint, false);
            onPaint();
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