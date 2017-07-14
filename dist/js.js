'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by leeseean on 2017/7/13.
 */
var canvas = document.getElementById('canvas');
canvas.style.position = 'fixed';
var canvasH = window.screen.availHeight;
var canvasW = window.screen.availWidth;
canvas.height = canvasH;
canvas.width = canvasW;
var context = canvas.getContext('2d');

var Star = function () {
    //创建星星实例
    function Star(x, y, length, opacity) {
        _classCallCheck(this, Star);

        this.x = parseInt(x);
        this.y = parseInt(y);
        this.length = parseInt(length);
        this.opacity = opacity;
        this.factor = 1;
        this.increment = Math.random() * .03;
    }

    _createClass(Star, [{
        key: 'draw',
        value: function draw() {
            context.rotate(Math.PI * 1 / 10);
            context.save();
            context.translate(this.x, this.y);
            if (this.opacity > 1) {
                this.factor = -1;
            } else if (this.opacity <= 0) {
                this.factor = 1;
                this.x = Math.round(Math.random() * canvasW);
                this.y = Math.round(Math.random() * canvasH);
            }
            this.opacity += this.increment * this.factor;
            context.beginPath();
            for (var i = 0; i < 5; i++) {
                //加粗星星
                context.lineTo(0, this.length);
                context.translate(0, this.length);
                context.rotate(Math.PI * 2 / 10);
                context.lineTo(0, -this.length);
                context.translate(0, -this.length);
                context.rotate(-(Math.PI * 6 / 10));
            }
            context.lineTo(0, this.length);
            context.closePath();
            context.fillStyle = 'rgba(255,255,200,' + this.opacity + ')';
            context.shadowBlur = 5;
            context.shadowColor = '#ffff33';
            context.fill();

            context.restore();
        }
    }]);

    return Star;
}();

var stars = [];
for (var i = 0; i < 3000; i++) {
    var x = Math.round(Math.random() * canvasW);
    var y = Math.round(Math.random() * canvasH);
    var length = 1 + Math.random() * 2;
    var opacity = Math.random();
    var star = new Star(x, y, length, opacity);
    stars.push(star);
}
function animate() {
    //count总的星星个数
    context.clearRect(0, 0, canvasW, canvasH);
    drawBg();
    stars.forEach(function (star) {
        return star.draw();
    });
    requestAnimationFrame(animate);
}
function drawBg() {
    //黑色背景
    context.save();
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvasW, canvasH);
    context.restore();
}

animate();
//# sourceMappingURL=js.js.map