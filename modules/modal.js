import { getConstants } from './constants.js';
import { formSubmitStatus } from './formSubmission.js';

const loadStylesheet = async url => new Promise((resolve, reject) => {
  const link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;

  link.onload = resolve;
  link.onerror = reject;

  document.head.append(link);
});

const createModal = data => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay overlay_confirm';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

  if (!formSubmitStatus.getError()) {
    overlay.innerHTML = `
      <div class="modal">
        <h2 class="modal__title">Подтверждение заявки</h2>
        <p class="modal__text">
          Бронирование путешествия в ${data.destination}
          на ${data.people} человек
        </p>
        <p class="modal__text">В даты: ${data.dates}</p>
        <p class="modal__text">Стоимость тура ${data.price}</p>
        <div class="modal__button">
          <button class="modal__btn modal__btn_confirm">Подтверждаю</button>
          <button class="modal__btn modal__btn_edit">Изменить данные</button>
        </div>
      </div>
    `;
  } else {
    overlay.innerHTML = `
      <div class="modal">
        <h2 class="modal__title">${getConstants().FORM_MESSAGES[2]}</h2>
        <p class="modal__text">${getConstants().FORM_MESSAGES[3]}</p>
        <div class="modal__button">
          <button class="modal__btn modal__btn_err">Забронировать</button>
        </div>
      </div>
    `;
  }

  document.body.append(overlay);
};

export const showModal = async (data) => {
  try {
    await loadStylesheet('css/modal.css');
  } catch (error) {
    console.error('Failed to load stylesheet', error.message);
  }

  createModal(data);
};
