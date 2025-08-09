// Intersection reveal
(function(){
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
if (!('IntersectionObserver' in window)) {
revealEls.forEach(el => el.classList.add('reveal-active'));
return;
}
const io = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if (entry.isIntersecting){
entry.target.classList.add('reveal-active');
io.unobserve(entry.target);
}
});
}, { threshold: 0.12 });
revealEls.forEach(el=> io.observe(el));
})();

// 3D tilt + sheen on main auth card
(function(){
const card = document.getElementById('authCard');
if (!card) return;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if (!canHover || prefersReduced) return;

let rafId = null;
function setMouseVars(e){
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
card.style.setProperty('--mouse-x', x + 'px');
card.style.setProperty('--mouse-y', y + 'px');

text
const cx = rect.width / 2, cy = rect.height / 2;
const rx = ((y - cy) / cy) * -3;  // rotateX
const ry = ((x - cx) / cx) * 3;   // rotateY

cancelAnimationFrame(rafId);
rafId = requestAnimationFrame(()=>{
  card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
});
}
function resetTilt(){ card.style.transform = ''; }

card.addEventListener('mousemove', setMouseVars);
card.addEventListener('mouseleave', resetTilt);
})();

// Cursor follower glow
(function(){
const follower = document.querySelector('.cursor-follower');
if (!follower) return;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) return;

let fRaf;
window.addEventListener('mousemove', (e)=>{
const mx = e.clientX, my = e.clientY;
document.documentElement.style.setProperty('--mouse-x', mx + 'px');
document.documentElement.style.setProperty('--mouse-y', my + 'px');
cancelAnimationFrame(fRaf);
fRaf = requestAnimationFrame(()=>{
follower.style.transform = translate3d(${mx - 40}px, ${my - 40}px, 0);
});
}, { passive: true });
})();

// Year in footer (optional)
(function(){
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
})();

// Button loading helper
function setLoading(btn, isLoading){
if (!btn) return;
btn.classList.toggle('btn-loading', isLoading);
const prev = btn.getAttribute('data-prev');
if (isLoading) {
btn.setAttribute('data-prev', btn.innerHTML);
const txt = btn.innerText;
btn.innerHTML = txt.includes('GitHub') ? 'Connecting to GitHub…' :
txt.includes('Google') ? 'Connecting to Google…' : 'Loading…';
} else if (prev) {
btn.innerHTML = prev;
btn.removeAttribute('data-prev');
}
}

// Centered popup for OAuth (fallback to redirect if blocked)
function openPopup(url, title='Sign in', w=520, h=620){
const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
const opts = toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${w},height=${h},top=${y},left=${x};
return window.open(url, title, opts);
}

// OAuth handlers — replace redirectUrl with your real routes
(function(){
const btnGoogle = document.getElementById('btnGoogle');
const btnGithub = document.getElementById('btnGithub');

async function oauthFlow(provider, btn){
try{  // Replace this with your stack:
  // NextAuth example: /api/auth/signin/google?callbackUrl=/dashboard
  // Clerk/Auth0/Supabase/Firebase: use their SDK or correct route
  const redirectUrl = `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent('/dashboard')}`;

  const pop = openPopup(redirectUrl, `Sign in with ${provider}`);
  if (!pop || pop.closed || typeof pop.closed === 'undefined') {
    // Popup blocked — redirect
    window.location.href = redirectUrl;
    return;
  }

  // Poll for popup close (provider completes and closes)
  const poll = setInterval(()=>{
    if (pop.closed) {
      clearInterval(poll);
      window.location.reload();
    }
  }, 600);
} catch (err){
  console.error(err);
  alert('Authentication failed. Please try again.');
} finally {
  // brief delay to avoid flicker if popup closes fast
  setTimeout(()=> setLoading(btn, false), 1200);
}
}

btnGoogle?.addEventListener('click', ()=> oauthFlow('google', btnGoogle));
btnGithub?.addEventListener('click', ()=> oauthFlow('github', btnGithub));
})();

// Email sign-in demo (replace with real API call)
(function(){
const form = document.getElementById('emailForm');
if (!form) return;
form.addEventListener('submit', async (e)=>{
e.preventDefault();
const email = document.getElementById('email')?.value.trim();
const pass = document.getElementById('password')?.value;
if (!email || !pass || pass.length < 6){
alert('Enter a valid email and a password with at least 6 characters.');
return;
}
// TODO: Replace with your API call
// Example:
// const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password: pass, remember: document.getElementById('remember')?.checked })});
// if (res.ok) location.href = '/dashboard'; else alert('Invalid credentials');
alert('Signed in (demo).');
});
})();
setLoading(btn, true);
