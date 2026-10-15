const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const close = document.getElementById('nav-close');
const closeMenu = () => {
  menu.classList.remove('show-menu');
  toggle.setAttribute('aria-expanded', 'false');
};
toggle.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
  toggle.setAttribute('aria-expanded', String(menu.classList.contains('show-menu')));
});
close.addEventListener('click', closeMenu);
document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav__link')];
const onScroll = () => {
  header.classList.toggle('header-shadow', window.scrollY > 40);
  scrollUp.classList.toggle('show-scroll', window.scrollY > 400);
  let current = sections[0];
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 150) current = section; });
  links.forEach(link => link.classList.toggle('active-link', link.hash === `#${current.id}`));
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
const dateInput = document.getElementById('guest-date');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;
document.getElementById('reservation-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const date = new Date(`${data.get('date')}T00:00:00`).toLocaleDateString(undefined, { dateStyle: 'long' });
  document.getElementById('reservation-status').textContent = `Thank you, ${data.get('name')}. Your request for ${data.get('guests')} guests on ${date} at ${data.get('time')} is ready for review. This demo has not sent or booked anything.`;
});
