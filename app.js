const container = document.getElementById('container');

document.getElementById('toRegister')?.addEventListener('click', () => {
  container.classList.add('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'false');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'true');
});

document.getElementById('toLogin')?.addEventListener('click', () => {
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

function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    Object.assign(el.style, {
      position: 'fixed',
      left: '50%',
      bottom: '24px',
      transform: 'translateX(-50%)',
      background: 'rgba(20,20,28,.9)',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '10px',
      zIndex: 9999,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      transition: 'opacity .22s',
    });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity = '0';
  }, 2000);
}

// Social OAuth demo handlers
function withLoading(btn, fn) {
  return async () => {
    btn.classList.add('is-loading');
    try {
      await fn();
    } finally {
      btn.classList.remove('is-loading');
    }
  };
}

document.querySelectorAll('.googleLogin').forEach(btn => {
  btn.addEventListener('click', withLoading(btn, async () => {
    toast('Redirecting to Google... (demo)');
    await new Promise(r => setTimeout(r, 1000));
    toast('Google sign-in complete! (demo)');
  }));
});

document.querySelectorAll('.githubLogin').forEach(btn => {
  btn.addEventListener('click', withLoading(btn, async () => {
    toast('Redirecting to GitHub... (demo)');
    await new Promise(r => setTimeout(r, 1000));
    toast('GitHub sign-in complete! (demo)');
  }));
});

(() => {
  const canvas = document.getElementById('wave-bg');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 75;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Plane geometry for waves
  const segmentsX = 50;
  const segmentsY = 50;
  const geometry = new THREE.PlaneBufferGeometry(120, 60, segmentsX, segmentsY);

  // Create a material with wireframe and soft yellow color
  const material = new THREE.MeshBasicMaterial({
    color: 0xffa82e,
    wireframe: true,
    opacity: 0.7,
    transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Animate waves using sine functions on vertices
  const positionAttribute = geometry.attributes.position;
  const vertexCount = positionAttribute.count;

  let time = 0;

  function animate() {
    requestAnimationFrame(animate);
    time += 0.02;

    for (let i = 0; i < vertexCount; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      // Wave formula: combination of sines for organic motion
      const waveX1 = 3 * Math.sin(i / 2 + time);
      const waveX2 = 2 * Math.sin(i / 3 + time * 1.5);
      const waveY = y + waveX1 + waveX2;

      positionAttribute.setZ(i, waveY * 0.7); // Displace vertices vertically
    }

    positionAttribute.needsUpdate = true;

    mesh.rotation.x = 0.7;
    mesh.rotation.z = time * 0.2;

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });

  animate();
})();
