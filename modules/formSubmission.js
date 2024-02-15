import { postData } from './APIUtils.js';
import { domElements } from './getDOMElements.js';
import { showModal } from './modal.js';
import { MESSAGES } from './utils.js';

const createMessageElement = (input, message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.style.cssText =
    document.defaultView.getComputedStyle(input, '').cssText;
  return messageElement;
};

const replaceInputWithMessage = (input, button, inputWrap, messageElement) => {
  inputWrap.style.padding = '15px 0';
  inputWrap.append(messageElement);
  input.replaceWith(messageElement);
  button && button.remove();
};

export const submitReservationForm = async url => {
  const { reservationForm, reservationName, reservationPhone } = domElements;

  const formData = new FormData(reservationForm);
  const data = Object.fromEntries(formData);

  data.name = reservationName.value;
  data.phone = reservationPhone.value;

  try {
    const result = await postData(url, data);
    showModal(MESSAGES[0], MESSAGES[1], true);
    reservationForm.reset();
    console.log(result);
  } catch (error) {
    showModal(MESSAGES[2], MESSAGES[3], false);
    console.error(error);
  }
};

export const submitFooterForm = async url => {
  const {
    footerForm,
    footerInput,
    footerButton,
    footerInputWrap,
  } = domElements;
  footerInput.name = 'email';

  const formData = new FormData(footerForm);
  const data = Object.fromEntries(formData);

  try {
    const result = await postData(url, data);
    const successMessage = createMessageElement(footerInput, MESSAGES[1]);
    replaceInputWithMessage(
      footerInput, footerButton, footerInputWrap, successMessage);
    console.log(result);
  } catch (error) {
    const failMessage = createMessageElement(footerInput, MESSAGES[2]);
    replaceInputWithMessage(
      footerInput, footerButton, footerInputWrap, failMessage);
    console.error(error);
  }
};
