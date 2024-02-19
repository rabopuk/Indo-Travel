import { postData } from './APIUtils.js';
import { getConstants } from './constants.js';
import { domElements } from './getDOMElements.js';
import { showModal } from './modal.js';

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

export const formSubmitStatus = (() => {
  let error = false;

  return {
    setError: (value) => {
      error = value;
    },
    getError: () => error,
  };
})();

export const submitReservationForm = async url => {
  const {
    reservationForm,
    reservationName,
    reservationPhone,
    reservationData,
    reservationPrice,
  } = domElements;

  const formData = new FormData(reservationForm);
  const data = Object.fromEntries(formData);

  data.name = reservationName.value;
  data.phone = reservationPhone.value;
  data.price = reservationPrice.textContent.slice(0, -1);

  try {
    const result = await postData(url, data);

    reservationForm.reset();
    reservationData.textContent = '';
    reservationPrice.textContent = '';

    console.log(result);
  } catch (error) {
    formSubmitStatus.setError(true);
    showModal(data);

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
    const successMessage =
      createMessageElement(footerInput, getConstants().FORM_MESSAGES[1]);

    replaceInputWithMessage(
      footerInput, footerButton, footerInputWrap, successMessage);
    console.log(result);
  } catch (error) {
    const failMessage =
      createMessageElement(footerInput, getConstants().FORM_MESSAGES[2]);

    replaceInputWithMessage(
      footerInput, footerButton, footerInputWrap, failMessage);
    console.error(error);
  }
};
