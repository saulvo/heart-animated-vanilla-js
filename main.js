const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const BG_COLOR = '#03022a';
const COLOR_FROM = '#5800E2';
const COLOR_TO = '#FF00E6';

const w = window.innerWidth;
const h = window.innerHeight;
let t = 0;

function getPosition(t, radius) {
  const x = radius * (16 * Math.pow(Math.sin(t), 3));
  const y = radius * (-13 * Math.cos(t) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t));
  return { x, y };
}

function createGradient() {
  const gradient = ctx.createLinearGradient(0, -100, 0, 100);
  gradient.addColorStop(0, COLOR_FROM);
  gradient.addColorStop(1, COLOR_TO);
  return gradient;
}

function animate() {
  if (t <= 2 * Math.PI) {
    const { x, y } = getPosition(t, 10);
    const gradient = createGradient();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.stroke();

    t += Math.PI / 180;
    window.requestAnimationFrame(animate);
  }

  ctx.font = 'bold 30px Poppins';
  ctx.textAlign = 'center';
  ctx.fillStyle = BG_COLOR;
  ctx.fillText('I LOVE YOU', 0, 0);
}

function init(w, h) {
  t = 0;
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);
  animate();
}

init(w, h);

window.addEventListener('resize', () => {
  init(window.innerWidth, window.innerHeight);
});
