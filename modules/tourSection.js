// import { domElements } from './getDOMElements.js';
// import {
//   createOption,
//   populateData,
//   updateButtonState,
//   updateCountSelect,
// } from './populateDateData.js';
// import { CONSTANTS } from './utils.js';

// export const initTourSection = async () => {
//   const dateData = await populateData();

//   const { dateSelectTour, peopleSelectTour, tourButton } = domElements;

//   dateSelectTour.append(createOption('', CONSTANTS[0]));
//   peopleSelectTour.append(createOption('', CONSTANTS[1]));

//   dateData.forEach(item => {
//     dateSelectTour.append(createOption(item.date, item.date));
//   });

//   const tourElements = [dateSelectTour, peopleSelectTour];

//   updateCountSelect(dateSelectTour, peopleSelectTour, dateData);
//   updateButtonState(tourElements, tourButton);
// };
