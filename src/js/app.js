import Messenger from './messenger';
import Recorder from './recorder';

const messenger = new Messenger();
const inputMessage = document.querySelector('.input-field');
let text = null;
const avRecorder = new Recorder();

avRecorder.init();

inputMessage.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    text = inputMessage.value;
    messenger.createMessage(text);
    inputMessage.value = '';
  }
});
