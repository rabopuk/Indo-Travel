/* eslint-disable max-len */
import {
  ANIMATION_DURATION,
  animateMenu,
  startAnimation,
} from './animateMenu.js';
import { domElements } from './getDOMElements.js';
import {
  createPriceWrapper,
  priceDiv,
  priceWrapper,
  removePriceWrapper,
  updateReservationInfo,
} from './initSections.js';
import {
  populateData,
  updateCountSelect,
} from './populateDateData.js';
import {
  CONSTANTS,
  getPersonDeclension,
  updateButtonState,
} from './utils.js';


const handleDateSelectChangeTour = (
  dateSelect,
  peopleSelect,
  elements,
  button,
  dateData,
) => {
  removePriceWrapper();
  updateCountSelect(dateSelect, peopleSelect, dateData);
  updateButtonState(elements, button);
};

const handlePeopleSelectChangeTour = (elements, button) => {
  removePriceWrapper();
  updateButtonState(elements, button);
};

const handleTourButtonClick = (dateSelect, peopleSelect, dateData) => {
  const selectedDate = dateSelect.value;
  const selectedItem = dateData.find(item => item.date === selectedDate);
  const selectedPeople = peopleSelect.value;

  if (selectedItem && selectedPeople !== CONSTANTS[1]) {
    const price = selectedItem.price * selectedPeople;

    if (!priceWrapper) {
      createPriceWrapper();
    }

    priceDiv.textContent = `Цена за ${selectedPeople} ` +
      `${getPersonDeclension(selectedPeople)}: ${price}`;
  }
};

const handleDateSelectChangeReservation = (
  dateSelect,
  peopleSelect,
  elements,
  button,
  dateData,
  reservationData,
  reservationPrice,
) => {
  updateCountSelect(dateSelect, peopleSelect, dateData);
  updateButtonState(elements, button);
  updateReservationInfo(dateSelect, peopleSelect, dateData, reservationData, reservationPrice);
};

const handlePeopleSelectChangeReservation = (
  dateSelect,
  peopleSelect,
  elements,
  button,
  dateData,
  reservationData,
  reservationPrice,
) => {
  updateButtonState(elements, button);
  updateReservationInfo(dateSelect, peopleSelect, dateData, reservationData, reservationPrice);
};

const handleReservationInputChange = (elements, button) => {
  updateButtonState(elements, button);
};

const handleMenuButtonClick = (e) => {
  e.stopPropagation();

  const { menu } = domElements;
  menu.classList.toggle('header__menu_active');
  startAnimation(ANIMATION_DURATION, animateMenu);
};

const handleDocumentClick = ({ target }) => {
  const { menu } = domElements;

  if (!menu.contains(target)) {
    menu.classList.remove('header__menu_active');
  }
};

const handleMenuClick = ({ target }) => {
  const { menu } = domElements;

  if (target.classList.contains('header__link')) {
    menu.classList.remove('header__menu_active');
  }
};

export const initEventListeners = async () => {
  const dateData = await populateData();
  const {
    dateSelectTour,
    peopleSelectTour,
    tourButton,
    dateSelectReservation,
    peopleSelectReservation,
    reservationButton,
    reservationData,
    reservationPrice,
    reservationName,
    reservationPhone,
    menuButton,
    menu,
  } = domElements;
  const tourElements = [dateSelectTour, peopleSelectTour];
  const reservationElements = [
    dateSelectReservation,
    peopleSelectReservation,
    reservationName,
    reservationPhone,
  ];

  dateSelectTour.addEventListener('change', () =>
    handleDateSelectChangeTour(
      dateSelectTour,
      peopleSelectTour,
      tourElements,
      tourButton,
      dateData,
    ));

  peopleSelectTour.addEventListener('change', () =>
    handlePeopleSelectChangeTour(tourElements, tourButton));

  tourButton.addEventListener('click', e => {
    e.preventDefault();
    handleTourButtonClick(dateSelectTour, peopleSelectTour, dateData);
  });

  dateSelectReservation.addEventListener('change', () =>
    handleDateSelectChangeReservation(
      dateSelectReservation,
      peopleSelectReservation,
      reservationElements,
      reservationButton,
      dateData,
      reservationData,
      reservationPrice,
    ));

  peopleSelectReservation.addEventListener('change', () =>
    handlePeopleSelectChangeReservation(
      dateSelectReservation,
      peopleSelectReservation,
      reservationElements,
      reservationButton,
      dateData,
      reservationData,
      reservationPrice,
    ));

  reservationName.addEventListener('input', () =>
    handleReservationInputChange(reservationElements, reservationButton));

  reservationPhone.addEventListener('input', () =>
    handleReservationInputChange(reservationElements, reservationButton));

  menuButton.addEventListener('click', handleMenuButtonClick);

  document.addEventListener('click', handleDocumentClick);

  menu.addEventListener('click', handleMenuClick);
};
