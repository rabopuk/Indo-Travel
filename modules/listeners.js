import { } from './APIUtils.js';
import { handleAccordion } from './accordion.js';
import {
  animateMenu,
  startAnimation,
} from './animateMenu.js';
import { getConstants } from './constants.js';
import { debouncedCalcFlyPosition } from './fly.js';
import {
  formSubmitStatus,
  submitFooterForm,
  submitReservationForm,
} from './formSubmission.js';
import { domElements } from './getDOMElements.js';
import {
  createPriceWrapper,
  getPriceDiv,
  getPriceWrapper,
  removePriceWrapper,
  updateReservationInfo,
} from './initSections.js';
import { showModal } from './modal.js';
import {
  updateCountSelect,
} from './populateDateData.js';
import {
  getPersonDeclension,
  updateButtonState,
} from './utils.js';

const handleDocumentLoad100ms = () => {
  const { itemsTravel, textWrappersTravel } = domElements;

  const heightWrapperTravel = handleAccordion();

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

  const heightWrapperTravel = handleAccordion();

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

  if (selectedItem && selectedPeople !== getConstants().FORM_CONSTANTS[1]) {
    const price = selectedItem.price * selectedPeople;

    if (!getPriceWrapper()) {
      createPriceWrapper();
    }

    const priceDiv = getPriceDiv();
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
  updateReservationInfo(
    dateSelect,
    peopleSelect,
    dateData,
    reservationData,
    reservationPrice,
  );
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
  updateReservationInfo(
    dateSelect,
    peopleSelect,
    dateData,
    reservationData,
    reservationPrice,
  );
};

const handleReservationInputChange = (elements, button) => {
  updateButtonState(elements, button);
};

const handleMenuButtonClick = (e) => {
  e.stopPropagation();

  const { menu } = domElements;
  menu.classList.toggle('header__menu_active');
  startAnimation(getConstants().ANIMATION_DURATION, animateMenu);
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

const handleReservationButtonClick = async (e) => {
  e.preventDefault();
  const {
    reservationPrice,
    reservationName,
    reservationPhone,
    reservationForm,
  } = domElements;
  const formData = new FormData(reservationForm);
  const data = Object.fromEntries(formData);

  data.name = reservationName.value;
  data.phone = reservationPhone.value;
  data.price = reservationPrice.textContent.slice(0, -1);

  showModal({
    destination: data.destination,
    people: data.people,
    dates: data.dates,
    price: data.price,
  });
};

const handleBodyClick = e => {
  const { target } = e;
  const { reservationForm } = domElements;

  if (target.classList.contains('modal__btn_confirm')) {
    e.preventDefault();
    e.stopPropagation();

    const { reservationButton } = domElements;
    const overlay = document.querySelector('.overlay');

    overlay.remove();

    submitReservationForm(getConstants().URL)
      .then(() => {
        if (!formSubmitStatus.getError()) {
          [...reservationForm.elements].forEach(element => {
            element.disabled = true;
          });
        } else {
          reservationButton.disabled = true;
        }
      });
  } else if (target.classList.contains('modal__btn_edit') ||
    target.classList.contains('modal__btn_err')) {
    e.preventDefault();
    e.stopPropagation();

    const { reservationSection } = domElements;
    const overlay = document.querySelector('.overlay');

    overlay.remove();
    reservationSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleFooterFormSubmit = (e) => {
  e.preventDefault();
  submitFooterForm(getConstants().URL);
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


export const initEventListeners = data => {
  const dateData = data;
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
    footerForm,
  } = domElements;
  const tourElements = [dateSelectTour, peopleSelectTour];
  const reservationElements = [
    dateSelectReservation,
    peopleSelectReservation,
    reservationName,
    reservationPhone,
  ];

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

  reservationButton.addEventListener('click', handleReservationButtonClick);

  document.body.addEventListener('click', handleBodyClick);

  footerForm.addEventListener('submit', handleFooterFormSubmit);

  document.body.addEventListener('click', handleModalClicks);
};
