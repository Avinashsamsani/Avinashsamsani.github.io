const canvas = document.querySelector("#signal-canvas");
const ctx = canvas.getContext("2d");
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;
let points = [];
let animationId = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  buildPoints();
}

function buildPoints() {
  const count = Math.max(28, Math.min(68, Math.floor(width / 22)));
  points = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.88,
    vx: (Math.random() - 0.5) * 0.26,
    vy: (Math.random() - 0.5) * 0.22,
    r: 1.4 + (index % 4) * 0.38,
    tone: index % 4,
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  points.forEach((point) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height * 0.9;
    if (point.y > height * 0.95) point.y = -20;
  });

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const alpha = (1 - distance / 150) * 0.16;
        ctx.strokeStyle = `rgba(23, 23, 23, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  points.forEach((point) => {
    const colors = ["47, 159, 109", "34, 108, 159", "199, 121, 33", "178, 71, 60"];
    ctx.fillStyle = `rgba(${colors[point.tone]}, 0.58)`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    ctx.fill();
  });

  animationId = requestAnimationFrame(draw);
}

function startCanvas() {
  cancelAnimationFrame(animationId);
  resizeCanvas();
  if (!mediaQuery.matches) {
    draw();
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));

window.addEventListener("resize", resizeCanvas);
mediaQuery.addEventListener("change", startCanvas);
startCanvas();
