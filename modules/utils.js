export const CONSTANTS = [
  'Дата путешествия',
  'Количество человек',
  'Выбрать дату',
];

const PERSON_DECLENSIONS = ['человек', 'человека'];

export const getPersonDeclension = num => {
  num = Math.abs(num) % 100;
  const num1 = num % 10;

  if (num > 10 && num < 20) return PERSON_DECLENSIONS[0];
  if (num1 > 1 && num1 < 5) return PERSON_DECLENSIONS[1];
  if (num1 === 1) return PERSON_DECLENSIONS[0];

  return PERSON_DECLENSIONS[0];
};

export const updateButtonState = (inputs, button) => {
  button.disabled = inputs.some(input => input.value === '');
};
