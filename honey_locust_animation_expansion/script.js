
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let particles = [];
let expansion = 1;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.radius = 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = 0.1 + Math.random() * 0.1;
        this.offset = Math.random() * 100;
    }

    update(mx, my) {
        let dx = this.x - mx;
        let dy = this.y - my;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let force = Math.max(50 - dist, 0);
        let angle = Math.atan2(dy, dx);

        this.x += Math.cos(angle) * force * 0.05;
        this.y += Math.sin(angle) * force * 0.05;

        let tx = this.ox * expansion;
        let ty = this.oy * expansion;
        this.x += (tx - this.x) * 0.01;
        this.y += (ty - this.y) * 0.01;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 1000; i++) {
        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * 100;
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;
        particles.push(new Particle(x + width / 2, y + height / 2));
    }
}

let mouseX = width / 2;
let mouseY = height / 2;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('click', () => {
    expansion *= 1.2;
});

function animate() {
    ctx.fillStyle = 'rgba(17, 17, 17, 0.1)';
    ctx.fillRect(0, 0, width, height);
    for (let p of particles) {
        p.update(mouseX, mouseY);
        p.draw();
    }
    requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
});
