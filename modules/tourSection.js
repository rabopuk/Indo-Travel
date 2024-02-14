/* eslint-disable object-curly-spacing */
import { getDOMElements } from './getDOMElements.js';
import { createOption, populateData } from './populateDateData.js';

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

  dateSelectTour.append(createOption('', 'Выбрать дату'));
  peopleSelectTour.append(createOption('', 'Количество человек'));

  dateData.forEach(item => {
    dateSelectTour.append(createOption(item.date, item.date));
  });

  const updatePeopleSelect = () => {
    const selectedDate = dateSelectTour.value;
    const { 'min-people': minPeople, 'max-people': maxPeople } =
      dateData.find(item => item.date === selectedDate) || {};

    peopleSelectTour.innerHTML = '';
    peopleSelectTour.append(createOption('', 'Количество человек'));

    if (minPeople && maxPeople) {
      for (let i = minPeople; i <= maxPeople; i++) {
        peopleSelectTour.append(createOption(i, i));
      }
    }
  };

  const updateButtonState = () => {
    const inputs = [dateSelectTour, peopleSelectTour];

    tourButton.disabled = inputs.some(input => input.value === '');
  };

  updateButtonState();

  dateSelectTour.addEventListener('change', () => {
    removePriceWrapper();
    updatePeopleSelect();
    updateButtonState();
  });

  peopleSelectTour.addEventListener('change', () => {
    removePriceWrapper();
    updateButtonState();
  });

  tourButton.addEventListener('click', e => {
    e.preventDefault();

    const selectedDate = dateSelectTour.value;
    const selectedItem = dateData.find(item => item.date === selectedDate);
    const selectedPeople = peopleSelectTour.value;

    if (selectedItem && selectedPeople !== 'Количество человек') {
      const price = selectedItem.price * selectedPeople;

      if (!priceWrapper) {
        createPriceWrapper();
      }

      priceDiv.textContent = `Цена за ${selectedPeople}: ${price}`;
    }
  });
};

initTourSection();
