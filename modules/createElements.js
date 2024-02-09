// export const createTimerTitle = (text) => {
//   const timerTitle = document.createElement('p');
//   timerTitle.className = 'timer__title';
//   timerTitle.textContent = text;

//   return timerTitle;
// };

// export const createTimerElement = (count, units, type) => {
//   const timerItem = document.createElement('p');
//   timerItem.className = `timer__item timer__item_${type}`;

//   const timerCount = document.createElement('span');
//   timerCount.className = `timer__count timer__count_${type}`;
//   timerCount.textContent = count.toString().padStart(2, '0');

//   const timerUnits = document.createElement('span');
//   timerUnits.className = `timer__units timer__units_${type}`;
//   timerUnits.textContent = units;

//   timerItem.append(timerCount, timerUnits);

//   return timerItem;
// };
