const container = document.getElementById('container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

toRegister?.addEventListener('click', () => {
container.classList.add('active');
});
toLogin?.addEventListener('click', () => {
container.classList.remove('active');
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
toast('Account created! You can sign in now. (demo)');
});

// Lightweight toast
function toast(msg){
let el = document.querySelector('.toast');
if (!el){
el = document.createElement('div');
el.className = 'toast';
Object.assign(el.style, {
position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
background:'rgba(20,20,28,.9)', color:'#fff', padding:'10px 14px',
borderRadius:'10px', border:'1px solid #2a2a3a', boxShadow:'0 8px 24px rgba(0,0,0,.4)',
zIndex:9999, fontFamily:'Poppins, sans-serif', fontSize:'14px'
});
document.body.appendChild(el);
}
el.textContent = msg;
el.style.opacity = '1';
clearTimeout(el._t);
el._t = setTimeout(()=>{ el.style.opacity = '0'; }, 2200);
}
