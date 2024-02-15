import { LOCAL_URL, URL } from './APIUtils.js';
import { heightWrapperTravel } from './accordion.js';
import {
  ANIMATION_DURATION,
  animateMenu,
  startAnimation,
} from './animateMenu.js';
import { debouncedCalcFlyPosition, handleResize } from './fly.js';
import { submitFooterForm, submitReservationForm } from './formSubmission.js';
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

const handleDocumentLoad100ms = () => {
  const { itemsTravel, textWrappersTravel } = domElements;

  setTimeout(() => {
    if (itemsTravel.length > 0) {
      itemsTravel[0].classList.add('travel__item_active');
      textWrappersTravel[0].style.height = `${heightWrapperTravel}px`;
    }
  }, 200);
};

const handleAccordionClick = ({ target }) => {
  const {
    accordion,
    itemsTravel,
    textWrappersTravel,
  } = domElements;

  if (target.classList.contains('travel__item-title')) {
    const index = [...accordion.children].indexOf(target.parentNode);

    for (let i = 0; i < itemsTravel.length; i++) {
      if (index === i) {
        textWrappersTravel[i].style.height =
          itemsTravel[i].classList.contains('travel__item_active') ?
            '' : `${heightWrapperTravel}px`;
        itemsTravel[i].classList.toggle('travel__item_active');
      } else {
        itemsTravel[i].classList.remove('travel__item_active');
        textWrappersTravel[i].style.height = '';
      }
    }
  }
};

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

const handleModalClicks = ({ target }) => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const modalButton = document.querySelector('.modal__button');
  const modalImg = document.querySelector('.modal__img');

  if (target === overlay || target === modalImg) {
    modal.remove();
    overlay.remove();
  } else if (target === modalButton) {
    modal.remove();
    overlay.remove();
    window.location.href = '#reservation';
  }
};

export const initEventListeners = async () => {
  const dateData = await populateData(LOCAL_URL);
  const {
    accordion,
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
    reservationForm,
    footerForm,
  } = domElements;
  const tourElements = [dateSelectTour, peopleSelectTour];
  const reservationElements = [
    dateSelectReservation,
    peopleSelectReservation,
    reservationName,
    reservationPhone,
  ];

  window.addEventListener('resize', handleResize);

  window.addEventListener('scroll', () => {
    requestAnimationFrame(debouncedCalcFlyPosition);
  });

  handleDocumentLoad100ms();

  accordion.addEventListener('click', handleAccordionClick);

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

  reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    submitReservationForm(URL);
  });

  footerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitFooterForm(URL);
  });

  document.body.addEventListener('click', handleModalClicks);
};
