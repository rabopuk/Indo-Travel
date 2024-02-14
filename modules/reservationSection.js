/* eslint-disable object-curly-spacing */
import { getDOMElements } from './getDOMElements.js';
import {
  createOption,
  populateData,
  updateButtonState,
  updateCountSelect,
} from './populateDateData.js';
import { CONSTANTS, getPersonDeclension } from './utils.js';

const initReservationSection = async () => {
  const dateData = await populateData();

  const {
    dateSelectReservation,
    peopleSelectReservation,
    reservationButton,
    reservationData,
    reservationPrice,
    reservationName,
    reservationPhone,
  } = getDOMElements();

  dateSelectReservation.append(createOption('', CONSTANTS[2]));
  peopleSelectReservation.append(createOption('', CONSTANTS[1]));

  dateData.forEach(item => {
    dateSelectReservation.append(createOption(item.date, item.date));
  });

  const updateReservationInfo = () => {
    const selectedDate = dateSelectReservation.value;
    const selectedItem = dateData.find(item => item.date === selectedDate);
    const selectedPeople = peopleSelectReservation.value;

    let textContent = '';
    let priceContent = '';

    if (selectedItem) {
      textContent = `${selectedDate} `;
    }

    if (selectedPeople !== '' && selectedPeople !== CONSTANTS[1]) {
      textContent += `${selectedPeople} ${getPersonDeclension(selectedPeople)}`;
    }

    if (selectedItem && selectedPeople !== '' &&
      selectedPeople !== CONSTANTS[1]) {
      priceContent = `${selectedItem.price * selectedPeople}₽`;
    }

    reservationData.textContent = textContent;
    reservationPrice.textContent = priceContent;
  };

  const reservationElements = [
    dateSelectReservation,
    peopleSelectReservation,
    reservationName,
    reservationPhone,
  ];

  updateButtonState(reservationElements, reservationButton);

  dateSelectReservation.addEventListener('change', () => {
    updateCountSelect(dateSelectReservation, peopleSelectReservation, dateData);
    updateButtonState(reservationElements, reservationButton);
    updateReservationInfo();
  });

  peopleSelectReservation.addEventListener('change', () => {
    updateButtonState(reservationElements, reservationButton);
    updateReservationInfo();
  });

  reservationName.addEventListener('input', () => {
    updateButtonState(reservationElements, reservationButton);
  });

  reservationPhone.addEventListener('input', () => {
    updateButtonState(reservationElements, reservationButton);
  });
};

initReservationSection();
