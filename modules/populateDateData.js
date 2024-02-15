import { fetchData } from './APIUtils.js';

export const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
};

export const populateData = async (url) => {
  try {
    const dateData = await fetchData(url);
    return dateData;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

export const updateCountSelect = (dateSelect, peopleSelect, dateData) => {
  const selectedDate = dateSelect.value;
  const { 'min-people': minPeople, 'max-people': maxPeople } =
    dateData.find(item => item.date === selectedDate) || {};

  peopleSelect.innerHTML = '';
  peopleSelect.append(createOption('', 'Количество человек'));

  if (minPeople && maxPeople) {
    for (let i = minPeople; i <= maxPeople; i++) {
      peopleSelect.append(createOption(i, i));
    }
  }
};
