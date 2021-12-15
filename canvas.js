let c = document.getElementById("canvasScreen");
let ctx = c.getContext("2d");

let window_width = window.innerWidth;
let window_height = window.innerHeight;

const maxRadius = 5;

let sumSnowFlakes = 0;

c.width = window_width;
c.height = window_height;

class SnowFlake {
    constructor(x, y, radius, speed, way, opacity, gradient) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.way = way;
        this.opacity = opacity;
        this.gradient = gradient;
    }

    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.gradient;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        if(this.way){
            this.x += this.speed / 4;
        } else {
            this.x -= this.speed / 4;
        }
        
        this.y += this.speed * 1.1;
    }
}

let snowFlakes;
snowFlakes = [];

function newSnowFlake() {
    let x = Math.floor(Math.random() * window_width);
    let y = Math.floor(Math.random() * maxRadius);
    let r = Math.floor(Math.random() * maxRadius);
    let speed = Math.random() + 0.1;
    let way = Math.floor(Math.random() * 2);
    let opacity = Math.random();
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, r);

    gradient.addColorStop(0, "rgba(255, 255, 255," + opacity + ")");
    gradient.addColorStop(0.8, "rgba(210, 236, 242," + opacity + ")");
    gradient.addColorStop(1, "rgba(237, 247, 249," + opacity + ")");

    let snowFlake = new SnowFlake(x, y, r, speed, way, opacity, gradient);
    
    snowFlakes.push(snowFlake);
}

setInterval(newSnowFlake, 1);

function init(ev) {
    window_width = window.innerWidth;
    window_height = window.innerHeight;

    c.width = window_width;
    c.height = window_height;
}

window.addEventListener("resize", init);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window_width, window_height);

    snowFlakes.forEach((snowFlake, i) => {
        if (snowFlake.y > window_height){
            sumSnowFlakes += 10;
            snowFlakes.splice(i, 1);
        } else {
            snowFlake.update();
        }
    })

    /*ctx.fillStyle = "white";
    ctx.fillRect(0, window_height - sumSnowFlakes / window_height, window_width, sumSnowFlakes / window_height);*/
}

animate();