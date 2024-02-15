/* eslint-disable max-len */
// import { domElements } from './getDOMElements.js';
// import {
//   createOption,
//   populateData,
//   updateButtonState,
// } from './populateDateData.js';
// import { CONSTANTS, getPersonDeclension } from './utils.js';

// export const updateReservationInfo = (dateSelectReservation, peopleSelectReservation, dateData, reservationData, reservationPrice) => {
//   const selectedDate = dateSelectReservation.value;
//   const selectedItem = dateData.find(item => item.date === selectedDate);
//   const selectedPeople = peopleSelectReservation.value;

//   let textContent = '';
//   let priceContent = '';

//   if (selectedItem) {
//     textContent = `${selectedDate} `;
//   }

//   if (selectedPeople !== '' && selectedPeople !== CONSTANTS[1]) {
//     textContent += `${selectedPeople} ${getPersonDeclension(selectedPeople)}`;
//   }

//   if (selectedItem && selectedPeople !== '' &&
//     selectedPeople !== CONSTANTS[1]) {
//     priceContent = `${selectedItem.price * selectedPeople}₽`;
//   }

//   reservationData.textContent = textContent;
//   reservationPrice.textContent = priceContent;
// };

// export const initReservationSection = async () => {
//   const dateData = await populateData();

//   const {
//     dateSelectReservation,
//     peopleSelectReservation,
//     reservationButton,
//     reservationData,
//     reservationPrice,
//     reservationName,
//     reservationPhone,
//   } = domElements;

//   dateSelectReservation.append(createOption('', CONSTANTS[2]));
//   peopleSelectReservation.append(createOption('', CONSTANTS[1]));

//   dateData.forEach(item => {
//     dateSelectReservation.append(createOption(item.date, item.date));
//   });

//   updateReservationInfo(dateSelectReservation, peopleSelectReservation, dateData, reservationData, reservationPrice);

//   const reservationElements = [
//     dateSelectReservation,
//     peopleSelectReservation,
//     reservationName,
//     reservationPhone,
//   ];

//   updateButtonState(reservationElements, reservationButton);
// };
