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

document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  toast('Signed in! (demo)');
});
document.getElementById('registerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  container.classList.remove('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'true');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'false');
  toast('Account created! You can sign in now. (demo)');
});

function toast(msg){
  let el = document.querySelector('.toast');
  if (!el){
    el = document.createElement('div');
    el.className = 'toast';
    Object.assign(el.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      background:'rgba(20,20,28,.9)', color:'#fff', padding:'10px 14px',
      borderRadius:'10px', zIndex:9999, fontFamily:'Poppins, sans-serif'
    });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(()=>{ el.style.opacity = '0'; }, 2000);
}

/* THREE.JS BACKGROUND */
(() => {
  const canvas = document.getElementById('scene3d');
  if(!canvas || typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 42;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const group = new THREE.Group();
  scene.add(group);

  const accent = 0xffa82e;
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
  for(let i=0;i<24;i++){
    const bgeo = new THREE.BoxGeometry(0.35, 1.5, 0.35);
    const bar = new THREE.Mesh(bgeo, barMat.clone());
    const angle = (i / 24) * Math.PI * 2;
    const r = 10.5;
    bar.position.set(Math.cos(angle)*r, Math.sin(angle)*r, -2.5);
    bars.add(bar);
  }

  let targetRX = 0, targetRY = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    targetRX = (0.5 - (e.clientY / window.innerHeight)) * 0.6;
    targetRY = ((e.clientX / window.innerWidth) - 0.5) * 0.6;
  });

  function animate(){
    requestAnimationFrame(animate);
    rx += (targetRX - rx) * 0.06;
    ry += (targetRY - ry) * 0.06;
    group.rotation.x = rx;
    group.rotation.y = ry;
    bars.children.forEach((bar, i) => {
      const h = 1.0 + Math.sin(Date.now()/500 + i)*0.5;
      bar.scale.y = h;
    });
    renderer.render(scene, camera);
  }
  animate();
})();
