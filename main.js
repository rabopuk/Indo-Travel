import './modules/accordion.js';
import './modules/fly.js';
import {
  initReservationSection,
  initTourSection,
} from './modules/initSections.js';
import './modules/listeners.js';
import { initEventListeners } from './modules/listeners.js';
import { initTimer } from './modules/timer.js';

export const init = () => {
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
