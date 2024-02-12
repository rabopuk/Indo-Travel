export const getDOMElements = () => {
  const timer = document.querySelector('.timer');
  const accordion = document.querySelector('.travel__accordion');
  const itemsTravel = document.querySelectorAll('.travel__item');
  const textWrappersTravel = document.querySelectorAll('.travel__item-text-wrapper');

  return {
    timer,
    accordion,
    itemsTravel,
    textWrappersTravel,
  };
};
