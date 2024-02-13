/* eslint-disable object-curly-spacing */
import './modules/accordion.js';
import './modules/fly.js';
import './modules/listeners.js';

import { initTimer } from './modules/timer.js';

// const init = () => {
// };

// document.addEventListener('DOMContentLoaded', init);

(() => {
  document.addEventListener('DOMContentLoaded', initTimer);
})();
