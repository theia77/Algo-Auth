const container = document.getElementById('container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

toRegister?.addEventListener('click', () => {
  container.classList.add('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'false');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'true');
});

toLogin?.addEventListener('click', () => {
  container.classList.remove('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'true');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'false');
});

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  // Validation can go here
  toast('Signed in! (demo)');
});
registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  container.classList.remove('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'true');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'false');
  toast('Account created! You can sign in now. (demo)');
});

// Toast message popup
function toast(msg){
  let el = document.querySelector('.toast');
  if (!el){
    el = document.createElement('div');
    el.className = 'toast';
    Object.assign(el.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      background:'rgba(20,20,28,.92)', color:'#fff', padding:'12px 18px',
      borderRadius:'12px', border:'1px solid #262635', boxShadow:'0 8px 24px rgba(0,0,0,.44)',
      zIndex:9999, fontFamily:'Poppins, sans-serif', fontSize:'15px', transition:'opacity .22s'
    });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(()=>{ el.style.opacity = '0'; }, 2200);
}

/* --------- THREE.JS 3D ANIMATION --------- */
(() => {
  const canvas = document.getElementById('scene3d');
  const container = document.getElementById('container');
  if(!canvas || typeof THREE === 'undefined') return;

  Object.assign(canvas.style, {
    position:'absolute', inset:'0', zIndex: 0, pointerEvents: 'none'
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
    if(!running || prefersReduced) return;

    const dt = 0.016;
    t += dt;

    rx += (targetRX - rx) * 0.06;
    ry += (targetRY - ry) * 0.06;
    group.rotation.x = rx + Math.sin(t*0.2)*0.019;
    group.rotation.y = ry + Math.cos(t*0.12)*0.021;

    bars.children.forEach((bar, i) => {
      const base = 1.0 + Math.sin(t*2 + i*0.5)*0.7 + Math.sin(t*1.3 + i*0.25)*0.25;
      const h = THREE.MathUtils.clamp(base, 0.4, 2.7);
      bar.scale.y = h;
    });

    renderer.render(scene, camera);
  }
  animate();
})();
