/* eslint-disable object-curly-spacing */
// import {
//   DAYS_VARS,
//   HOURS_VARS,
//   MINUTES_VARS,
//   MS_PER_DAY,
//   MS_PER_HOUR,
//   MS_PER_MINUTE,
// } from './constants.js';
// import { createTimerElement, createTimerTitle } from './createElements.js';
// import { declension } from './utils.js';

// !  Вначале делал timer, разбивая по логике на модули
// !  Потом при перепрочтении задания понял, что раз должно получиться что-то
// ! вроде плагина, следует всё собрать в один модуль

const DAYS_VARS = ['день', 'дня', 'дней'];
const HOURS_VARS = ['час', 'часа', 'часов'];
const MINUTES_VARS = ['минута', 'минуты', 'минут'];

const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

const createTimerTitle = (text) => {
  const timerTitle = document.createElement('p');
  timerTitle.className = 'timer__title';
  timerTitle.textContent = text;

  return timerTitle;
};

const createTimerElement = (count, units, type) => {
  const timerItem = document.createElement('p');
  timerItem.innerHTML = `
    <p class="timer__item timer__item_${type}">
      <span class="timer__count timer__count_${type}">
        ${count.toString().padStart(2, '0')}
      </span>
      <span class="timer__units timer__units_${type}">
        ${units}
      </span>
    </p>
  `;

  return timerItem;
};

const declension = (num, expressions) => {
  let result;
  let count = num % 100;

  if (count >= 5 && count <= 20) {
    result = expressions['2'];
  } else {
    count %= 10;

    if (count === 1) {
      result = expressions['0'];
    } else if (count >= 2 && count <= 4) {
      result = expressions['1'];
    } else {
      result = expressions['2'];
    }
  }

  return result;
};

const updateTimer = (timer, deadline, intervalId) => {
  const now = new Date();
  const remainingTime = deadline - now;

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    timer.style.display = 'none';
    return;
  }

  const days = Math.floor(remainingTime / MS_PER_DAY);
  const hours = Math.floor((remainingTime % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((remainingTime % MS_PER_HOUR) / MS_PER_MINUTE);

  const timerTitle =
    createTimerTitle('До конца акции осталось:');
  const timerDays =
    createTimerElement(days, declension(days, DAYS_VARS), 'days');
  const timerHours =
    createTimerElement(hours, declension(hours, HOURS_VARS), 'hours');
  const timerMinutes =
    createTimerElement(minutes, declension(minutes, MINUTES_VARS), 'minutes');

  timer.innerHTML = '';
  timer.append(timerTitle, timerDays, timerHours, timerMinutes);

  timer.style.padding = '32px';
  timer.style.borderRadius = '16px';

  // Поменял логику цветов
  // Много времени до конца - зелёный, мало - красный
  if (days >= 1) {
    timer.style.backgroundColor = 'forestgreen';
  } else {
    timer.style.backgroundColor = 'maroon';
  }
};

export const initTimer = () => {
  const timer = document.querySelector('.timer');
  const deadline = new Date(timer.dataset.timerDeadline);
  // Меняю время на GMT+3
  deadline.setUTCHours(deadline.getUTCHours() + 3);

  // ! Вызываю раз в минуту, а то слишком часто обновлять каждую секунду
  const intervalId =
    setInterval(() => updateTimer(timer, deadline, intervalId), 60 * 1000);

  updateTimer(timer, deadline, intervalId);
};
