export const showModal = (title, message, isSuccess) => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.45)';
  overlay.style.zIndex = '1000';
  overlay.style.padding = '20px';
  document.body.append(overlay);

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.position = 'fixed';
  modal.style.boxSizing = 'border-box';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.background = 'white';
  modal.style.padding = '20px';
  modal.style.zIndex = '1001';
  modal.style.width = '980px';
  modal.style.height = '495px';
  modal.style.maxWidth = 'calc(100% - 40px)';
  modal.style.maxHeight = 'calc(100% - 40px)';
  modal.style.overflow = 'auto';
  modal.style.border = '1px solid #AFAFAF';
  modal.style.borderRadius = '30px';
  modal.style.boxShadow = '0 4px 4px rgba(0, 0, 0, 0.25)';

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  titleElement.style.fontSize = '34px';
  titleElement.style.lineHeight = '150%';
  titleElement.style.marginBottom = '20px';

  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.fontSize = '18px';
  messageElement.style.lineHeight = '150%';
  messageElement.style.fontWeight = 'bold';
  messageElement.style.marginBottom = '40px';

  modal.append(titleElement, messageElement);

  let button;

  if (isSuccess) {
    const img = document.createElement('img');
    img.className = 'modal__img';
    img.src = '../img/Ok.svg';
    modal.append(img);
  } else {
    button = document.createElement('button');
    button.classList.add('button', 'modal__button', 'reservation__button');
    button.type = 'button';
    button.textContent = 'Забронировать';
    modal.append(button);
  }

  document.body.append(modal);
};
