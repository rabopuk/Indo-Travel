import { getConstants } from './constants.js';
import { debounceTimer } from './debounceTimer.js';

const createFlyElement = () => {
  const fly = document.createElement('div');
  fly.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: url('img/airplane.svg') center/contain no-repeat;
    z-index: 900;
  `;
  document.body.append(fly);

  return fly;
};

export const handleResize = (fly) => {
  const { MIN_WINDOW_WIDTH } = getConstants();
  fly.style.display = window.innerWidth < MIN_WINDOW_WIDTH ? 'none' : 'block';
};

const initFly = () => {
  const { TRANSITION_DURATION } = getConstants();
  let lastScrollTop = 0;
  const fly = createFlyElement();

  handleResize(fly);

  const setFlyTransform = (top, rotation) => {
    fly.style.transform = `translateY(${-top}px) rotate(${rotation})`;
  };

  const setFlyTransition = (transition) => {
    fly.style.transition = transition;
  };

  const calcFlyPosition = () => {
    const doc = document.documentElement;
    const maxBottom = doc.clientHeight - fly.clientHeight;
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const percentScroll = (window.scrollY * 100) / maxScroll;
    const top = maxBottom * (percentScroll / 100);
    const scrollPosition = window.scrollY;
    const rotation = scrollPosition > lastScrollTop ? '0deg' : '180deg';

    setFlyTransform(top, rotation);

    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;

    if (window.scrollY === 0) {
      setFlyTransition(TRANSITION_DURATION);
      setTimeout(() => setFlyTransform(0, '0deg'), 100);
    } else if (window.scrollY + window.innerHeight >= doc.scrollHeight) {
      setFlyTransition(TRANSITION_DURATION);
      setTimeout(() => setFlyTransform(maxBottom, '180deg'), 100);
    } else {
      setFlyTransition('');
    }
  };

  const debouncedCalcFlyPosition =
    debounceTimer(calcFlyPosition, getConstants().DEBOUNCE_DELAY);

  window.addEventListener('resize', () => handleResize(fly));

  return debouncedCalcFlyPosition;
};

export const debouncedCalcFlyPosition = initFly();
