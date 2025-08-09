const container = document.getElementById('container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

toRegister?.addEventListener('click', () => {
container?.classList.add('active');
});
toLogin?.addEventListener('click', () => {
container?.classList.remove('active');
});

// Demo handlers (replace with real API calls)
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm?.addEventListener('submit', (e) => {
e.preventDefault();
const email = document.getElementById('loginEmail').value.trim();
const pass = document.getElementById('loginPassword').value;
if (!email || pass.length < 6) {
toast('Please enter a valid email and a password with at least 6 characters.');
return;
}
toast('Signed in! (demo)');
});

registerForm?.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('regName').value.trim();
const email = document.getElementById('regEmail').value.trim();
const pass = document.getElementById('regPassword').value;
if (!name || !email || pass.length < 6) {
toast('Please fill all fields. Password must be at least 6 characters.');
return;
}
container?.classList.remove('active');
toast('Account created! You can sign in now. (demo)');
});

// Toast
function toast(msg){
let el = document.querySelector('.toast');
if (!el){
el = document.createElement('div');
el.className = 'toast';
Object.assign(el.style, {
position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
background:'rgba(20,20,28,.9)', color:'#fff', padding:'10px 14px',
borderRadius:'10px', border:'1px solid #2a2a3a', boxShadow:'0 8px 24px rgba(0,0,0,.4)',
zIndex:9999, fontFamily:'Poppins, sans-serif', fontSize:'14px', transition:'opacity .2s ease'
});
document.body.appendChild(el);
}
el.textContent = msg;
el.style.opacity = '1';
clearTimeout(el._t);
el._t = setTimeout(()=>{ el.style.opacity = '0'; }, 2200);
}

// Social OAuth demo handlers (replace with real OAuth)
function withLoading(btn, fn){
return async () => {
btn.classList.add('is-loading');
try { await fn(); }
finally { btn.classList.remove('is-loading'); }
};
}

const googleBtns = document.querySelectorAll('.googleLogin');
const githubBtns = document.querySelectorAll('.githubLogin');

googleBtns.forEach(btn => {
btn.addEventListener('click', withLoading(btn, async () => {
// window.location.href = '/auth/google';
await demoOAuth('Google');
}));
});

githubBtns.forEach(btn => {
btn.addEventListener('click', withLoading(btn, async () => {
// window.location.href = '/auth/github';
await demoOAuth('GitHub');
}));
});

async function demoOAuth(provider){
toast(Redirecting to ${provider}... (demo));
await new Promise(r => setTimeout(r, 900));
toast(${provider} sign-in complete! (demo));
}

// Three.js 3D background
(() => {
const canvas = document.getElementById('scene3d');
if(!canvas || typeof THREE === 'undefined') return;

const container = document.getElementById('container');
Object.assign(canvas.style, {
position:'absolute', inset:'0', zIndex: 1, pointerEvents: 'none'
});

const scene = new THREE.Scene();
const accent = 0xffa82e;

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 0, 42);

const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

function resize(){
const w = container.clientWidth;
const h = container.clientHeight;
renderer.setSize(w, h, false);
camera.aspect = w / h;
camera.updateProjectionMatrix();
}
resize();
window.addEventListener('resize', resize);

scene.fog = new THREE.FogExp2(0x12121a, 0.015);

const group = new THREE.Group();
scene.add(group);

const geo = new THREE.IcosahedronGeometry(14, 2);
const wireMat = new THREE.MeshBasicMaterial({ color: 0x2a2a3a, wireframe:true, transparent:true, opacity:.6 });
const mesh = new THREE.Mesh(geo, wireMat);
group.add(mesh);

const verts = geo.attributes.position;
const nodeGeo = new THREE.SphereGeometry(0.18, 8, 8);
const nodeMat = new THREE.MeshBasicMaterial({ color: accent, transparent:true, opacity:.85 });
for(let i=0;i<verts.count;i++){
const node = new THREE.Mesh(nodeGeo, nodeMat.clone());
node.position.fromBufferAttribute(verts, i);
node.position.multiplyScalar(1.02);
group.add(node);
}

const bars = new THREE.Group();
group.add(bars);
const barMat = new THREE.MeshBasicMaterial({ color: accent, transparent:true, opacity:.9 });
const BAR_COUNT = 24;
for(let i=0;i<BAR_COUNT;i++){
const w = 0.35, d = 0.35, h = 1.5;
const bgeo = new THREE.BoxGeometry(w, h, d);
const bar = new THREE.Mesh(bgeo, barMat.clone());
const angle = (i / BAR_COUNT) * Math.PI * 2;
const r = 10.5;
bar.position.set(Math.cos(angle)*r, Math.sin(angle)*r, -2.5);
bars.add(bar);
}

let targetRX = 0, targetRY = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', (e)=>{
const rect = renderer.domElement.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width;
const y = (e.clientY - rect.top) / rect.height;
targetRX = (0.5 - y) * 0.6;
targetRY = (x - 0.5) * 0.6;
}, { passive:true });

const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let t = 0;
let running = true;
document.addEventListener('visibilitychange', ()=>{
running = !document.hidden;
});

function animate(){
requestAnimationFrame(animate);
if(!running || prefersReduced) return;const dt = 0.016;
t += dt;

rx += (targetRX - rx) * 0.06;
ry += (targetRY - ry) * 0.06;
group.rotation.x = rx + Math.sin(t*0.2)*0.02;
group.rotation.y = ry + Math.cos(t*0.15)*0.02;

bars.children.forEach((bar, i) => {
  const base = 1.0 + Math.sin(t*2 + i*0.5)*0.6 + Math.sin(t*1.3 + i*0.27)*0.3;
  const h = THREE.MathUtils.clamp(base, 0.4, 2.8);
  bar.scale.y = h;
});

renderer.render(scene, camera);
}
animate();
})();
