/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { getDOMElements } from './getDOMElements.js';

const {
  accordion,
  itemsTravel,
  textWrappersTravel,
} = getDOMElements();

let heightWrapperTravel = 0;

textWrappersTravel.forEach(elem => {
  if (heightWrapperTravel < elem.scrollHeight) {
    heightWrapperTravel = elem.scrollHeight;
  }
});

accordion.addEventListener('click', ({ target }) => {
  const btn = target;

  if (btn.classList.contains('travel__item-title')) {
    const index = [...accordion.children].indexOf(btn.parentNode);

    for (let i = 0; i < itemsTravel.length; i++) {
      if (index === i) {
        textWrappersTravel[i].style.height =
          itemsTravel[i].classList.contains('travel__item_active') ?
            '' : `${heightWrapperTravel}px`;
        itemsTravel[i].classList.toggle('travel__item_active');
      } else {
        itemsTravel[i].classList.remove('travel__item_active');
        textWrappersTravel[i].style.height = '';
      }
    }
  }
});
