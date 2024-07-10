console.log("Start....")
const canvas = document.getElementById("canvas1") as HTMLCanvasElement
const ctx = canvas.getContext("2d")!
const particlesArray: Particle[] = []
let hue = 0;




type mouseMovementType = {
  x: number | undefined, y: number | undefined
}
const mouse: mouseMovementType = {
  y: undefined, x: undefined
}
const onMouseMove = (e: MouseEvent) => {
  mouse.x = e.x
  mouse.y = e.y

}
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  constructor(
  ) {
    this.x = mouse.x ?? 0
    this.y = mouse.y ?? 0
    // this.x = Math.random() * canvas.width
    // this.y = Math.random() * canvas.height
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.color = "hsl(" + hue + ", 100%,50%)";
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= .1
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill()
    ctx.closePath();
  }

}
canvas.addEventListener("mousemove", (e) => {
  onMouseMove(e)
  init(1)
})
window.addEventListener("resize", resizeCanvas)
function init(size: number) {
  for (let index = 0; index < size; index++) {
    particlesArray.push(new Particle())

  }
}

function handleParticles() {
  console.log("number of particles now is :", particlesArray.length)
  for (let index = 0; index < particlesArray.length; index++) {
    const p1 = particlesArray[index];
    p1.update()
    p1.draw()
    if (p1.size <= .3) {
      particlesArray.splice(index, 1)
    }
    // adding constellations to particles
    for (let j = index; j < particlesArray.length; j++) {
      const p2 = particlesArray[j]

      // pythagorean theorem 
      const d2x = Math.pow(p1.x - p2.x, 2)
      const d2y = Math.pow(p1.y - p2.y, 2)
      const distance = Number(Math.sqrt(d2x + d2y).toFixed(2))

      if (distance < 100) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.strokeStyle = p1.color
        ctx.lineWidth = .1
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke();
        ctx.closePath()
      }
    }

  }
}



function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // ctx.fillStyle = "rgba(0,0,0,.02)"
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  handleParticles()
  hue += 1
  // console.log(mouse)
  requestAnimationFrame(animate)
}

animate()
