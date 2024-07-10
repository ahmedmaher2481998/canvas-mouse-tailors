console.log("Start....");
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var particlesArray = [];
var hue = 0;
var mouse = {
    y: undefined, x: undefined
};
var onMouseMove = function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
};
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
var Particle = /** @class */ (function () {
    function Particle() {
        var _a, _b;
        this.x = (_a = mouse.x) !== null && _a !== void 0 ? _a : 0;
        this.y = (_b = mouse.y) !== null && _b !== void 0 ? _b : 0;
        // this.x = Math.random() * canvas.width
        // this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = "hsl(" + hue + ", 100%,50%)";
    }
    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2)
            this.size -= .1;
    };
    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    };
    return Particle;
}());
canvas.addEventListener("mousemove", function (e) {
    onMouseMove(e);
    init(1);
});
window.addEventListener("resize", resizeCanvas);
function init(size) {
    for (var index = 0; index < size; index++) {
        particlesArray.push(new Particle());
    }
}
function handleParticles() {
    console.log("number of particles now is :", particlesArray.length);
    for (var index = 0; index < particlesArray.length; index++) {
        var p1 = particlesArray[index];
        p1.update();
        p1.draw();
        if (p1.size <= .3) {
            particlesArray.splice(index, 1);
        }
        // adding constellations to particles
        for (var j = index; j < particlesArray.length; j++) {
            var p2 = particlesArray[j];
            // pythagorean theorem 
            var dx = Math.pow(p1.x - p2.x, 2);
            var dy = Math.pow(p1.y - p2.y, 2);
            var distance = Number(Math.sqrt(dx + dy).toFixed(2));
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.strokeStyle = p1.color;
                ctx.lineWidth = .1;
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,.02)"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles();
    hue += 1;
    // console.log(mouse)
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=app.js.map