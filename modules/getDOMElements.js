/* eslint-disable max-len */
export const getDOMElements = () => {
  const timer = document.querySelector('.timer');

  const accordion = document.querySelector('.travel__accordion');
  const itemsTravel = document.querySelectorAll('.travel__item');
  const textWrappersTravel = document.querySelectorAll('.travel__item-text-wrapper');

  const menuButton = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');

  return {
    timer,
    accordion,
    itemsTravel,
    textWrappersTravel,
    menuButton,
    menu,
  };
};
