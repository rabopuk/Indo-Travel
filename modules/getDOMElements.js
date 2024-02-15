const getDOMElements = () => {
  const timer = document.querySelector('.timer');

  const accordion = document.querySelector('.travel__accordion');
  const itemsTravel = document.querySelectorAll('.travel__item');
  const textWrappersTravel =
    document.querySelectorAll('.travel__item-text-wrapper');

  const menuButton = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');

  const dateSelectTour = document.getElementById('tour__date');
  const peopleSelectTour = document.getElementById('tour__people');
  const tourButton = document.querySelector('.tour__button');
  const tourForm = document.querySelector('.tour__form');

  const dateSelectReservation = document.getElementById('reservation__date');
  const peopleSelectReservation =
    document.getElementById('reservation__people');
  const reservationButton = document.querySelector('.reservation__button');
  const reservationForm = document.querySelector('.reservation__form');
  const reservationData = document.querySelector('.reservation__data');
  const reservationPrice = document.querySelector('.reservation__price');
  const reservationName = document.getElementById('reservation__name');
  const reservationPhone = document.getElementById('reservation__phone');

  return {
    timer,
    accordion,
    itemsTravel,
    textWrappersTravel,
    menuButton,
    menu,
    dateSelectTour,
    peopleSelectTour,
    tourButton,
    tourForm,
    dateSelectReservation,
    peopleSelectReservation,
    reservationButton,
    reservationForm,
    reservationData,
    reservationPrice,
    reservationName,
    reservationPhone,
  };
};

export const domElements = getDOMElements();
