/* eslint-disable object-curly-spacing */
import './modules/accordion.js';
import './modules/fly.js';
import './modules/listeners.js';
import './modules/reservationSection.js';
import './modules/tourSection.js';

import {
  initReservationSection,
  initTourSection,
} from './modules/initSections.js';
import { initEventListeners } from './modules/listeners.js';
import { initTimer } from './modules/timer.js';

const init = () => {
  initTourSection();
  initReservationSection();

  initEventListeners();
};

(() => {
  document.addEventListener('DOMContentLoaded', init);
})();

(() => {
  document.addEventListener('DOMContentLoaded', initTimer);
})();
