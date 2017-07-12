/**
 * Created by leese on 2017/7/13.
 */
let canvas = document.getElementById('canvas');
canvas.style.position = 'fixed';
canvas.style.backgroundColor = '#000';
let canvasH = window.screen.availHeight;
let canvasW = window.screen.availWidth;
canvas.height = canvasH;
canvas.width = canvasW;
let context = canvas.getContext('2d');
class Star {//创建星星实例
    constructor(x,y,length,opacity){
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.length = parseInt(length);
        this.opacity = opacity;
        this.factor = 1;
        this.increment = Math.random()*.03;
    }
    draw(){
        context.rotate(Math.PI*1/10);
        context.save();
        context.translate(this.x,this.y);
        if(this.opacity > 1) {
            this.factor = -1;
        }else if(this.opacity <= 0){
            this.factor = 1;
            this.x = Math.round(Math.random()*canvasW);
            this.y = Math.round(Math.random()*canvasH);
        }
        this.opacity += this.increment*this.factor;
        context.beginPath();
        for(let i=0;i<5;i++){//加粗星星
            context.lineTo(0,this.length);
            context.translate(0,this.length);
            context.rotate(Math.PI*2/10);
            context.lineTo(0,-this.length);
            context.translate(0,-this.length);
            context.rotate(-(Math.PI*6/10));
        }
        context.lineTo(0,this.length);
        context.closePath();
        context.fillStyle = `rgba(255,255,200,${this.opacity})`;
        context.shadowBlur = 5;
        context.shadowColor = '#ffff33';
        context.fill();

        context.restore();
    }
}

let stars = [];
for(let i = 0; i < 3000; i++) {
    let x = Math.round(Math.random()*canvasW);
    let y = Math.round(Math.random()*canvasH);
    let length = 1 + Math.random()*2;
    let opacity = Math.random();
    let star = new Star(x,y,length,opacity);
    stars.push(star);
}
function animate() {//count总的星星个数
    context.clearRect(0,0,canvasW,canvasH);
    stars.forEach(star=>star.draw());
    requestAnimationFrame(animate);
}
animate();

