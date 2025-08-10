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
  alert('Signed in! (demo)');
});
registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  container.classList.remove('active');
  alert('Account created! You can sign in now. (demo)');
});

/* Three.js init here if you keep background */
