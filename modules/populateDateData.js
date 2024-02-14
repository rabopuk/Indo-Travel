/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
import { fetchData } from './fetch.js';

export const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
};

export const populateData = async () => {
  try {
    const dateData = await fetchData('date.json');
    return dateData;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};
