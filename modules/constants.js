export const getConstants = () => {
  const URL = 'https://jsonplaceholder.typicode.com/posts';
  // const URL = 'false address trulyayaaaaaa';
  const LOCAL_URL = 'date.json';

  const ANIMATION_DURATION = 500;

  const TRANSITION_DURATION = 'transform .3s';
  const DEBOUNCE_DELAY = 10;
  const MIN_WINDOW_WIDTH = 758;

  const FORM_CONSTANTS = [
    'Дата путешествия',
    'Количество человек',
    'Выбрать дату',
  ];

  const FORM_MESSAGES = [
    'Ваша заявка успешно принята',
    'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней',
    'Упс... Что-то пошло не так',
    'Не удалось отправить заявку. Пожалуйста, повторите отправку ещё раз',
    'Забронировать',
  ];

  const PERSON_DECLENSIONS = ['человек', 'человека'];
  return {
    URL,
    LOCAL_URL,
    ANIMATION_DURATION,
    TRANSITION_DURATION,
    DEBOUNCE_DELAY,
    MIN_WINDOW_WIDTH,
    FORM_CONSTANTS,
    FORM_MESSAGES,
    PERSON_DECLENSIONS,
  };
};
