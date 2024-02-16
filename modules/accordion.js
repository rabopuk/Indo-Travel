import { domElements } from './getDOMElements.js';

export const handleAccordion = () => {
  const { textWrappersTravel } = domElements;
  let heightWrapperTravel = 0;

  textWrappersTravel.forEach(elem => {
    if (heightWrapperTravel < elem.scrollHeight) {
      heightWrapperTravel = elem.scrollHeight;
    }
  });

  return heightWrapperTravel;
};

handleAccordion();
