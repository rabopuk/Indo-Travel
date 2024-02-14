/* eslint-disable object-curly-spacing */
import './modules/accordion.js';
import './modules/fly.js';
import './modules/listeners.js';
import './modules/reservationSection.js';
import './modules/tourSection.js';

import { initTimer } from './modules/timer.js';

(() => {
  document.addEventListener('DOMContentLoaded', initTimer);
})();
