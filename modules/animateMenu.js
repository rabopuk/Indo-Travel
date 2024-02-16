import { domElements } from './getDOMElements.js';

const easeInOutCubic = timeFraction => (
  timeFraction < 0.5 ?
    4 * timeFraction * timeFraction * timeFraction :
    1 - Math.pow(-2 * timeFraction + 2, 3) / 2
);

export const startAnimation = (duration, callback) => {
  let startAnimationTime = NaN;
  let requestId = NaN;

  const step = (timestamp) => {
    startAnimationTime ||= timestamp;

    const progress = (timestamp - startAnimationTime) / duration;

    callback(progress);

    if (progress < 1) {
      requestId = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(requestId);
    }
  };

  requestId = requestAnimationFrame(step);
};

export const animateMenu = (progress) => {
  const { menu } = domElements;
  const easing = easeInOutCubic(progress);

  menu.style.transform = `translateX(${easing * 100}%)`;

  if (progress >= 1) {
    menu.style.transform = '';
  }
};
