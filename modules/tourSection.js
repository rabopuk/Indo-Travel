/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
import { getDOMElements } from './getDOMElements.js';
import {
  createOption,
  populateData,
  updateButtonState,
  updateCountSelect,
} from './populateDateData.js';
import { CONSTANTS, getPersonDeclension } from './utils.js';

let priceWrapper;
let priceDiv;

const removePriceWrapper = () => {
  if (priceWrapper) {
    priceWrapper.remove();
    priceWrapper = null;
    priceDiv = null;
  }
};

const createPriceWrapper = () => {
  const { tourForm, tourButton } = getDOMElements();

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

const initTourSection = async () => {
  const dateData = await populateData();

  const { dateSelectTour, peopleSelectTour, tourButton } = getDOMElements();

  dateSelectTour.append(createOption('', CONSTANTS[0]));
  peopleSelectTour.append(createOption('', CONSTANTS[1]));

  dateData.forEach(item => {
    dateSelectTour.append(createOption(item.date, item.date));
  });

  const tourElements = [dateSelectTour, peopleSelectTour];

  updateCountSelect(dateSelectTour, peopleSelectTour, dateData);
  updateButtonState(tourElements, tourButton);

  dateSelectTour.addEventListener('change', () => {
    removePriceWrapper();
    updateCountSelect(dateSelectTour, peopleSelectTour, dateData);
    updateButtonState(tourElements, tourButton);
  });

  peopleSelectTour.addEventListener('change', () => {
    removePriceWrapper();
    updateButtonState(tourElements, tourButton);
  });

  tourButton.addEventListener('click', e => {
    e.preventDefault();

    const selectedDate = dateSelectTour.value;
    const selectedItem = dateData.find(item => item.date === selectedDate);
    const selectedPeople = peopleSelectTour.value;

    if (selectedItem && selectedPeople !== CONSTANTS[1]) {
      const price = selectedItem.price * selectedPeople;

      if (!priceWrapper) {
        createPriceWrapper();
      }

      priceDiv.textContent = `
        Цена за ${selectedPeople} ${getPersonDeclension(selectedPeople)}: ${price}
      `;
    }
  });
};

initTourSection();
