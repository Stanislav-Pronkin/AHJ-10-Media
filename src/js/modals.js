export default function createModal() {
  const modal = document.createElement('div');

  modal.className = 'modal';
  modal.innerHTML = `<h3 class="modal-header">Что-то пошло не так...</h3>
    <p class="modal-message">К сожалению, нам не удалось опраделить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
    <p class="modal-message">Широта и долгота через запятую.</p>
    <input type"text" class="modal-input">
    <div class="modal-buttons">
      <button class="modal-ok button" type="button">Ok</button>
      <button class="modal-cancel button" type="button">Отмена</button>
    </div>`;

  return modal;
}
