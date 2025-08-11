// Panel slide toggles
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

// Form submit demo
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

// Toast message
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

// MATRIX RAIN + EQ BARS BACKGROUND
(() => {
  const cols = 60; // matrix columns
  const fontSize = 18;
  const chars = '01{}[]<>+-*/;=()#';
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const drops = Array(cols).fill(1);
  const eqBars = Array(cols).fill(1);

  function randChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }
  function drawEQBars() {
    const barWidth = w / cols;
    for (let i = 0; i < cols; i++) {
      eqBars[i] = Math.max(4, Math.sin(Date.now()/300 + i) * 42 + Math.random() * 24);
      ctx.fillStyle = 'rgba(255, 168, 46, 0.75)';
      ctx.shadowColor = 'rgba(255,168,46,0.7)';
      ctx.shadowBlur = 16;
      ctx.fillRect(i * barWidth, h - eqBars[i], barWidth * 0.7, eqBars[i]);
      ctx.shadowBlur = 0;
    }
  }
  function animate() {
    ctx.fillStyle = 'rgba(18, 18, 26, 0.16)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    for (let i = 0; i < drops.length; i++) {
      ctx.fillStyle = 'rgba(255, 168, 46, 0.95)';
      ctx.shadowColor = 'rgba(255,168,46,0.7)';
      ctx.shadowBlur = 16;
      ctx.fillText(randChar(), i * w/cols + w/(cols*2), drops[i] * fontSize);
      drops[i] += Math.random() * 1.8 + 1.2;
      if (drops[i] * fontSize > h - eqBars[i] - 20) {
        drops[i] = Math.random() * -10;
      }
      ctx.shadowBlur = 0;
    }
    drawEQBars();
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
  animate();
})();
