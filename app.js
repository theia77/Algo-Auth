const container = document.getElementById('container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

// Slide toggle between login and register form
toRegister?.addEventListener('click', () => {
  container.classList.add('active');
  // Accessibility: show register, hide login
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'false');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'true');
});

toLogin?.addEventListener('click', () => {
  container.classList.remove('active');
  // Accessibility: show login, hide register
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'true');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'false');
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
  container.classList.remove('active');
  document.querySelector('.form-box.register').setAttribute('aria-hidden', 'true');
  document.querySelector('.form-box.login').setAttribute('aria-hidden', 'false');
  toast('Account created! You can sign in now. (demo)');
});

// Toast helper function
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

// Social OAuth demo handlers
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
  toast(`Redirecting to ${provider}... (demo)`);
  await new Promise(r => setTimeout(r, 900));
  toast(`${provider} sign-in complete! (demo)`);
}

/* Three.js 3D background initialization below remains unchanged */
/* ... (your existing Three.js background code) ... */
