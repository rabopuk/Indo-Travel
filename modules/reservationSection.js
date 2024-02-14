/* eslint-disable object-curly-spacing */
import { getDOMElements } from './getDOMElements.js';
import { createOption, populateData } from './populateDateData.js';

const PERSON_DECLENSIONS = ['человек', 'человека', 'человек'];

const getPersonDeclension = num => {
  num = Math.abs(num) % 100;
  const num1 = num % 10;

  if (num > 10 && num < 20) return PERSON_DECLENSIONS[2];
  if (num1 > 1 && num1 < 5) return PERSON_DECLENSIONS[1];
  if (num1 === 1) return PERSON_DECLENSIONS[0];

  return PERSON_DECLENSIONS[2];
};

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

  dateSelectReservation.append(createOption('', 'Дата путешествия'));
  peopleSelectReservation.append(createOption('', 'Количество человек'));

  dateData.forEach(item => {
    dateSelectReservation.append(createOption(item.date, item.date));
  });

  const updatePeopleSelect = () => {
    const selectedDate = dateSelectReservation.value;
    const { 'min-people': minPeople, 'max-people': maxPeople } =
      dateData.find(item => item.date === selectedDate) || {};

    peopleSelectReservation.innerHTML = '';
    peopleSelectReservation.append(createOption('', 'Количество человек'));

    if (minPeople && maxPeople) {
      for (let i = minPeople; i <= maxPeople; i++) {
        peopleSelectReservation.append(createOption(i, i));
      }
    }
  };

  const updateButtonState = () => {
    const inputs = [
      dateSelectReservation,
      peopleSelectReservation,
      reservationName,
      reservationPhone,
    ];

    reservationButton.disabled = inputs.some(input => input.value === '');
  };

  const updateReservationInfo = () => {
    const selectedDate = dateSelectReservation.value;
    const selectedItem = dateData.find(item => item.date === selectedDate);
    const selectedPeople = peopleSelectReservation.value;

    let textContent = '';
    let priceContent = '';

    if (selectedItem) {
      textContent = `${selectedDate}`;
    }

    if (selectedPeople !== '' && (selectedPeople !== 'Количество человек')) {
      textContent +=
        ` ${selectedPeople} ${getPersonDeclension(selectedPeople)}`;
    }

    if (selectedItem && (selectedPeople !== '') &&
      (selectedPeople !== 'Количество человек')) {
      priceContent = `${selectedItem.price * selectedPeople}₽`;
    }

    reservationData.textContent = textContent;
    reservationPrice.textContent = priceContent;
  };

  updateButtonState();

  dateSelectReservation.addEventListener('change', () => {
    updatePeopleSelect();
    updateButtonState();
    updateReservationInfo();
  });

  peopleSelectReservation.addEventListener('change', () => {
    updateButtonState();
    updateReservationInfo();
  });

  reservationName.addEventListener('input', updateButtonState);
  reservationPhone.addEventListener('input', updateButtonState);
};

initReservationSection();
