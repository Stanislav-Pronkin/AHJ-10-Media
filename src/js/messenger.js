import getGeoposition, { validateLocation } from './geoposition';
import createModal from './modals';

function formatDate(value) {
  const returnValue = value < 10 ? `0${value}` : value;

  return returnValue;
}

function getDate() {
  const itemDate = new Date();
  const date = formatDate(itemDate.getDate());
  const month = formatDate(itemDate.getMonth() + 1);
  const year = formatDate(itemDate.getFullYear());
  const hours = formatDate(itemDate.getHours());
  const min = formatDate(itemDate.getMinutes());
  const created = `${date}.${month}.${year} ${hours}:${min}`;

  return created;
}

export default class Messenger {
  constructor() {
    this.messages = document.querySelector('.messages');
    this.coordinates = null;
  }

  async createMessage(text) {
    this.coordinates = await getGeoposition();
    console.log(this.coordinates);

    if (this.coordinates === 'none') {
      const modalError = document.querySelector('.modal');

      if (!modalError) {
        const modal = createModal();

        document.body.appendChild(modal);

        const ok = modal.querySelector('.modal-ok');
        const cancel = modal.querySelector('.modal-cancel');
        const input = modal.querySelector('.modal-input');

        ok.addEventListener('click', () => {
          const valid = validateLocation(input.value);

          if (valid) {
            console.log(input.value);
            this.coordinates = input.value;
            this.addMessage(text, this.coordinates);
            modal.parentNode.removeChild(modal);
          } else {
            alert('Введите корректные координаты');
          }
        });

        cancel.addEventListener('click', () => {
          modal.parentNode.removeChild(modal);
        });
      }
    } else {
      this.addMessage(text, this.coordinates);
    }
  }

  addMessage(text, geoPosition) {
    const message = document.createElement('div');

    message.className = 'message';
    message.innerHTML = `<div class='message-item'>
        <p class="message-text">${text}</p>
        <div class="message-coordinates">${geoPosition}</div>
        </div>
        <div class="message-date">${getDate()}</div>`;

    this.messages.insertAdjacentElement('afterbegin', message);
  }
}
