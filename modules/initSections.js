import { domElements } from './getDOMElements.js';
import { createOption, populateData } from './populateDateData.js';
import { CONSTANTS, getPersonDeclension, updateButtonState } from './utils.js';

export let priceWrapper;
export let priceDiv;

const initSection = async (
  dateSelect, peopleSelect, button, additionalElements = [], updateInfo,
) => {
  const dateData = await populateData();

  dateSelect.append(createOption('', CONSTANTS[0]));
  peopleSelect.append(createOption('', CONSTANTS[1]));

  dateData.forEach(item => {
    dateSelect.append(createOption(item.date, item.date));
  });

  const elements = [dateSelect, peopleSelect, ...additionalElements];

  if (updateInfo) {
    updateInfo(dateSelect, peopleSelect, dateData);
  }

  updateButtonState(elements, button);
};

export const removePriceWrapper = () => {
  if (priceWrapper) {
    priceWrapper.remove();
    priceWrapper = null;
    priceDiv = null;
  }
};

export const createPriceWrapper = () => {
  const { tourForm, tourButton } = domElements;

  priceWrapper = document.createElement('label');
  priceWrapper.className = 'tour__select-wrapper';

  priceDiv = document.createElement('div');
  priceDiv.className = 'tour__select';
  priceDiv.style.backgroundImage = 'none';
  priceDiv.style.display = 'flex';
  priceDiv.style.alignItems = 'center';

  priceWrapper.append(priceDiv);
  tourForm.insertBefore(priceWrapper, tourButton);
};

export const updateReservationInfo = (
  dateSelect, peopleSelect, dateData, resData, resPrice,
) => {
  const selectedDate = dateSelect.value;
  const selectedItem = dateData.find(item => item.date === selectedDate);
  const selectedPeople = peopleSelect.value;

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

  resData.textContent = textContent;
  resPrice.textContent = priceContent;
};

export const initTourSection = () => {
  const { dateSelectTour, peopleSelectTour, tourButton } = domElements;
  initSection(dateSelectTour, peopleSelectTour, tourButton);
};

export const initReservationSection = () => {
  const {
    dateSelectReservation,
    peopleSelectReservation,
    reservationButton,
    reservationData,
    reservationPrice,
    reservationName,
    reservationPhone,
  } = domElements;

  initSection(
    dateSelectReservation,
    peopleSelectReservation,
    reservationButton,
    [reservationName, reservationPhone],
    (dateSelect, peopleSelect, dateData) =>
      updateReservationInfo(dateSelect, peopleSelect, dateData,
        reservationData, reservationPrice),
  );
};
