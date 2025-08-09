// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle controls
const container = document.getElementById('container');
document.getElementById('toRegister')?.addEventListener('click', () => container.classList.add('active'));
document.getElementById('toLogin')?.addEventListener('click', () => container.classList.remove('active'));

// Demo form handlers (replace with real API calls)
document.getElementById('loginForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const email = document.getElementById('loginEmail').value.trim();
const pass = document.getElementById('loginPassword').value;
if (!email || pass.length < 6) { alert('Enter a valid email and 6+ char password.'); return; }
alert('Signed in! (demo)');
});
document.getElementById('registerForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const name = document.getElementById('regName').value.trim();
const email = document.getElementById('regEmail').value.trim();
const pass = document.getElementById('regPassword').value;
if (!name || !email || pass.length < 6) { alert('Please fill all fields.'); return; }
container.classList.remove('active');
alert('Account created! (demo)');
});

// Social buttons (replace URLs with your real routes or NextAuth signIn)
const go = (url) => window.location.href = url;
document.getElementById('loginGoogle')?.addEventListener('click', ()=> go('/api/auth/signin/google?callbackUrl=/dashboard'));
document.getElementById('loginGithub')?.addEventListener('click', ()=> go('/api/auth/signin/github?callbackUrl=/dashboard'));
document.getElementById('signupGoogle')?.addEventListener('click', ()=> go('/api/auth/signin/google?callbackUrl=/dashboard'));
document.getElementById('signupGithub')?.addEventListener('click', ()=> go('/api/auth/signin/github?callbackUrl=/dashboard'));

// 3D background: animated code matrix + music equalizer bars
(function(){
const canvas = document.getElementById('bgCanvas');
if (!canvas) return;
const ctx = canvas.getContext('2d');
let w, h, raf;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

// Code matrix columns
let cols = [];
// Music bars
const bars = 48;
let barVals = new Array(bars).fill(0);

const codeChars = '01{};<>/\=+-_*#@$%&|'.split('');

function resize(){
w = canvas.width = Math.floor(innerWidth * DPR);
h = canvas.height = Math.floor(innerHeight * DPR);
canvas.style.width = innerWidth + 'px';
canvas.style.height = innerHeight + 'px';

text
const colWidth = Math.max(14 * DPR, 10);
const count = Math.ceil(w / colWidth);
cols = new Array(count).fill(0).map((_, i)=>({
  x: i * colWidth + (Math.random()*4-2)*DPR,
  y: Math.random() * -h,
  speed: (1.2 + Math.random()*1.6) * DPR,
  font: `${Math.floor(14*DPR)}px "Poppins", "Inter", monospace`
}));
}
window.addEventListener('resize', resize);
resize();

// Smooth random target for bars
function updateBars(){
for(let i=0;i<bars;i++){
const t = Math.sin((performance.now()/700) + i*0.35) * 0.5 + 0.5;
const rnd = Math.random()0.25;
const target = (t0.85 + rnd) * 1.0;
barVals[i] = barVals[i]0.85 + target0.15;
}
}

function draw(){
ctx.clearRect(0,0,w,h);
  // Subtle vignette
const grad = ctx.createRadialGradient(w*0.7, h*0.1, 0, w*0.7, h*0.1, Math.max(w,h)*0.9);
grad.addColorStop(0, 'rgba(245,158,11,0.10)');
grad.addColorStop(1, 'rgba(0,0,0,0)');
ctx.fillStyle = grad;
ctx.fillRect(0,0,w,h);

// Code rain
cols.forEach(c=>{
  ctx.font = c.font;
  ctx.fillStyle = 'rgba(229,231,235,0.18)';
  const ch = codeChars[(Math.random()*codeChars.length)|0];
  ctx.fillText(ch, c.x, c.y);
  c.y += c.speed;
  if (c.y > h + 40*DPR) {
    c.y = -Math.random()*h*0.5;
    c.x += (Math.random()*2-1)*DPR;
  }
});

// Music equalizer at bottom
updateBars();
const baseY = h - 60*DPR;
const width = Math.min(w*0.8, 1100*DPR);
const left = (w - width)/2;
const gap = 4*DPR;
const bw = (width - gap*(bars-1)) / bars;

for(let i=0;i<bars;i++){
  const v = barVals[i];
  const bh = (40*DPR) + v*(70*DPR);
  const x = left + i*(bw+gap);
  const y = baseY - bh;

  // Glow
  ctx.fillStyle = 'rgba(245,158,11,0.10)';
  ctx.fillRect(x, y-6*DPR, bw, bh+12*DPR);

  // Bar
  const grd = ctx.createLinearGradient(0, y, 0, y+bh);
  grd.addColorStop(0, '#F59E0B');
  grd.addColorStop(1, '#D97706');
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, bw, bh);

  // Top highlight
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(x, y, bw, 2*DPR);
}

raf = requestAnimationFrame(draw);
}
draw();

// Parallax slight tilt on mouse
let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;
function onMove(e){
const cx = innerWidth/2;
const cy = innerHeight/2;
const dx = (e.clientX - cx) / cx;
const dy = (e.clientY - cy) / cy;
targetTiltX = dy * 8; // rotateX degrees
targetTiltY = -dx * 8; // rotateY degrees
}
function animateTilt(){
tiltX += (targetTiltX - tiltX)*0.06;
tiltY += (targetTiltY - tiltY)*0.06;
// We’ll simulate parallax by offsetting the canvas context slightly
// Actual canvas rotation is expensive; instead we translate elements a bit.
// Already good as is; optional advanced transforms can be added with CSS.
requestAnimationFrame(animateTilt);
}
animateTilt();

window.addEventListener('mousemove', onMove, { passive:true });
})();
