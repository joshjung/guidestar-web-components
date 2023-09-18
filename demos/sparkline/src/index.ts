import Sparkline from 'jwc-sparkline';

const width: number = 700;
const height: number = 100;
let recording : boolean = false;
let mediaRecorder : MediaRecorder | null = null;
let audio: Blob | null = null;
let sparkline : typeof Sparkline = undefined;

function initialize() {
  createRecordingButtons();
}

function startRecording() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true,
        },
      )

      // Success callback
      .then((stream : MediaStream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (e : BlobEvent) => {
          audio = e.data;

          renderWaveToSparkline()
        };
      })

      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

function stopRecording() {
  mediaRecorder?.stop();
}

function renderWaveToSparkline() {
  if (!audio) {
    throw new Error('audio was null');
  }

  const blob : Blob = new Blob([audio], { type: "audio/ogg; codecs=opus" });

  blob.arrayBuffer().then(arrayBuffer => {
    const audioContext : AudioContext = new AudioContext();

    audioContext.decodeAudioData(arrayBuffer).then(audioBuffer => {
      const values : number[] = Array.prototype.slice.call(audioBuffer.getChannelData(0));
      sparkline.renderWave(values, width, height);
    })
  })
}

function createSparklineCanvas(width : number, height : number) {
  const canvas :HTMLCanvasElement = document.createElement('canvas');

  canvas.id = "CursorLayer";
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = '8';
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  const body : HTMLBodyElement = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  return canvas;
}

function createRecordingButtons() {
  const button : HTMLButtonElement = document.createElement('button');
  button.textContent = 'Start Recording';

  button.addEventListener('click', () => {
    if (!recording) {
      button.textContent = 'Stop Recording!';
      startRecording();
    } else {
      button.textContent = 'Start Recording...';
      stopRecording();
    }

    recording = !recording;
  });

  const body : HTMLBodyElement = document.getElementsByTagName("body")[0];
  body.appendChild(button);
}

if (typeof window !== 'undefined') {
  initialize();

  const canvas :HTMLCanvasElement = createSparklineCanvas(width, height);

  sparkline = new Sparkline({
    canvas,
    ready: () => {

    }
  });
}
