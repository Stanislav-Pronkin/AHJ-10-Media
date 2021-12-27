import Messenger from './messenger';

export default class Recorder {
  constructor() {
    this.messenger = new Messenger();
  }

  init() {
    this.audioRec = document.querySelector('.audio-rec');
    this.videoRec = document.querySelector('.camera-rec');
    this.stopRec = document.querySelector('.stop-rec');
    this.cancelRec = document.querySelector('.cancel-rec');
    this.recTimer = document.querySelector('.timer');
    this.avButtons = document.querySelector('.av-buttons');
    this.cancelButtons = document.querySelector('.cancel-buttons');

    this.audioRec.addEventListener('click', () => {
      this.avButtons.classList.add('hidden');
      this.cancelButtons.classList.remove('hidden');
      this.avRecorder();
    });

    this.videoRec.addEventListener('click', () => {
      this.avButtons.classList.add('hidden');
      this.cancelButtons.classList.remove('hidden');
      this.avRecorder(true);
    });
  }

  async avRecorder(recVideo = false) {
    if (!navigator.mediaDevices) {
      const msg = 'Браузер не поддерживает запись мультимедиа.';
      alert(msg);
      return;
    }
    try {
      const mediaContentType = recVideo ? 'video' : 'audio';
      let saveMedia = true;
      let recordingTime = 0;
      let timing = null;

      if (!window.MediaRecorder) {
        const msg = 'Запись звука невозможна.';
        alert(msg);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: recVideo,
      });

      if (recVideo) {
        const videoPreview = document.createElement('video');
        videoPreview.controls = true;
        videoPreview.muted = 'muted';
        videoPreview.className = 'video-preview';
        document.body.appendChild(videoPreview);
        videoPreview.srcObject = stream;
        videoPreview.play();
      }

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.start();

      recorder.addEventListener('start', () => {
        timing = setInterval(() => {
          this.recTimer.innerText = this.timer(recordingTime += 1);
        }, 1000);
      });

      recorder.addEventListener('dataavailable', (evt) => {
        chunks.push(evt.data);
      });

      recorder.addEventListener('stop', async () => {
        clearInterval(timing);
        this.recTimer.innerText = '00:00';

        if (saveMedia) {
          const mediaElement = document.createElement(mediaContentType);
          const blob = new Blob(chunks, { type: `${mediaContentType}/mp4` });
          const fileReader = new FileReader();

          fileReader.readAsDataURL(blob);
          fileReader.onload = () => {
            mediaElement.src = fileReader.result;
            mediaElement.controls = true;
            this.messenger.createMessage(mediaElement.outerHTML);
          };
        }

        if (recVideo) {
          document.body.removeChild(document.querySelector('.video-preview'));
        }
        this.avButtons.classList.remove('hidden');
        this.cancelButtons.classList.add('hidden');
      });

      this.stopRec.addEventListener('click', () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        saveMedia = true;
      });

      this.cancelRec.addEventListener('click', () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        saveMedia = false;
      });
    } catch (e) {
      const msg = 'Не удалось подключится к камере/микрофону';

      alert(msg);
      this.avButtons.classList.remove('hidden');
      this.cancelButtons.classList.add('hidden');
    }
  }

  /* eslint-disable class-methods-use-this */
  timer(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = (seconds - (min * 60));
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }
}
