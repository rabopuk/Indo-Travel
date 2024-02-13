/* eslint-disable object-curly-spacing */
import {
  ANIMATION_DURATION,
  animateMenu,
  startAnimation,
} from './animateMenu.js';
import { getDOMElements } from './getDOMElements.js';

const {
  menuButton,
  menu,
} = getDOMElements();

menuButton.addEventListener('click', e => {
  e.stopPropagation();
  menu.classList.toggle('header__menu_active');
  startAnimation(ANIMATION_DURATION, animateMenu);
});

document.addEventListener('click', ({ target }) => {
  if (!menu.contains(target)) {
    menu.classList.remove('header__menu_active');
  }
});

menu.addEventListener('click', ({ target }) => {
  if (target.classList.contains('header__link')) {
    menu.classList.remove('header__menu_active');
  }
});
