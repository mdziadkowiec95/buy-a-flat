const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.nav');

// navToggler.addEventListener('click', (e) => {
//   e.preventDefault();

// });

document.querySelector('.header__nav').addEventListener('click', (e) => {
  if (e.target.matches('.nav-toggler, .nav-toggler *')) {
    e.preventDefault();
    navToggler.classList.toggle('is-open');
    navMenu.classList.toggle('collapsed');
  } else if (e.target.matches('.nav__link, .nav__link *')) {
    navToggler.classList.remove('is-open');
    navMenu.classList.remove('collapsed');
  }

});
