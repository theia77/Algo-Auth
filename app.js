const container = document.getElementById('container');

document.getElementById('toRegister')?.addEventListener('click', () => {
  container.classList.add('active');
});
document.getElementById('toLogin')?.addEventListener('click', () => {
  container.classList.remove('active');
});

document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault(); toast('Signed in! (demo)');
});
document.getElementById('registerForm')?.addEventListener('submit', e => {
  e.preventDefault();
  container.classList.remove('active');
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
      borderRadius:'10px', zIndex:9999
    });
    document.body.appendChild(el);
  }
  el.textContent = msg; el.style.opacity = '1';
  clearTimeout(el._t); el._t = setTimeout(()=>{ el.style.opacity = '0'; }, 2000);
}

// Social buttons demo
function withLoading(btn, fn) {
  return async () => { btn.classList.add('is-loading'); try { await fn(); } finally { btn.classList.remove('is-loading'); } };
}
document.querySelectorAll('.googleLogin').forEach(btn => {
  btn.addEventListener('click', withLoading(btn, async () => {
    toast('Redirecting to Google... (demo)'); await new Promise(r => setTimeout(r, 1000));
    toast('Google sign-in complete! (demo)');
  }));
});
document.querySelectorAll('.githubLogin').forEach(btn => {
  btn.addEventListener('click', withLoading(btn, async () => {
    toast('Redirecting to GitHub... (demo)'); await new Promise(r => setTimeout(r, 1000));
    toast('GitHub sign-in complete! (demo)');
  }));
});

// Starfield + Nebula background
(() => {
  const canvas = document.getElementById('starfield-canvas');
  if(!canvas || typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b0f, 0.002);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 2000);
  camera.position.z = 500;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Stars
  const starCount = 1200;
  const positions = [], sizes = [];
  for(let i=0;i<starCount;i++){
    positions.push((Math.random()*2000)-1000, (Math.random()*2000)-1000, (Math.random()*2000)-1000);
    sizes.push(Math.random()*5+1);
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffa82e, size: 4, transparent: true, opacity: 0.85,
    depthWrite: false, blending: THREE.AdditiveBlending
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Nebula clouds
  const loader = new THREE.TextureLoader();
  const cloudTexture = loader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
  const clouds = new THREE.Group();
  for(let i=0;i<30;i++){
    const cloudMaterial = new THREE.SpriteMaterial({
      map: cloudTexture, color: 0xffa82e, transparent: true,
      opacity: 0.15 + Math.random()*0.1, blending: THREE.AdditiveBlending
    });
    const cloud = new THREE.Sprite(cloudMaterial);
    cloud.position.set((Math.random()*1800)-900,(Math.random()*800)-400,(Math.random()*1500)-750);
    cloud.scale.set(600+Math.random()*400, 250+Math.random()*300, 1);
    clouds.add(cloud);
  }
  scene.add(clouds);

  let time=0;
  function animate(){
    requestAnimationFrame(animate);
    time += 0.0015;
    stars.rotation.y = time*0.2;
    clouds.rotation.z = time*0.1;
    clouds.children.forEach((cloud,idx) => {
      cloud.material.opacity = 0.1 + Math.sin(time*5+idx)*0.05 + 0.05;
    });
    renderer.render(scene, camera);
  }
  window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
  animate();
})();
