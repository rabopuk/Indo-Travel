import { getData } from './modules/APIUtils.js';
import './modules/accordion.js';
import { getConstants } from './modules/constants.js';
import './modules/fly.js';
import {
  initReservationSection,
  initTourSection,
} from './modules/initSections.js';
import './modules/listeners.js';
import { initEventListeners } from './modules/listeners.js';
import { initTimer } from './modules/timer.js';

export const init = async () => {
  const localData = await getData(getConstants().LOCAL_URL);

  initTourSection(localData);
  initReservationSection(localData);

  initEventListeners(localData);
};

(() => {
  document.addEventListener('DOMContentLoaded', init);
})();

(() => {
  document.addEventListener('DOMContentLoaded', initTimer);
})();
