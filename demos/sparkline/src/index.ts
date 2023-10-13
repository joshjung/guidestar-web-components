import Sparkline from '@guidestar/sparkline';

const timesliceMs : number = 50;

const width: number = 700;
const height: number = 100;

let recording : boolean = false;
let mediaRecorder : MediaRecorder | null = null;
let sparkline : Sparkline | undefined = undefined;
let canvasSmall :HTMLCanvasElement | undefined = undefined;
let canvasLarge :HTMLCanvasElement | undefined = undefined;
let audioChunks : Blob[] = [];

function initialize() {
  setupRecordingButton();
  setupCanvas(width, height);

  /**
   * Here is where we create a new Sparkline object, and of course we could listen to the ready() callback if
   * we need to do something immediately when the WASM stuff is loaded and ready to go.
   *
   * Note: we only need one sparkline object to render into multiple canvases or to render multiple times.
   */
  sparkline = new Sparkline({
    profile: true,
    ready: () => {
      console.log('Sparkline is ready to render!');
    }
  });
}

/**
 * Start the recording from the user's microphone.
 */
function startRecording() {
  if (navigator.mediaDevices?.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } })
      .then((stream : MediaStream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(timesliceMs);
        mediaRecorder.ondataavailable = (e : BlobEvent) => {
          audioChunks.push(e.data);

          renderWaveToSparkline();
        };
        mediaRecorder.onstop = () => {
          audioChunks = [];
        }
      })
      .catch(console.error);
  } else {
    console.error("getUserMedia not supported on your browser!");
  }
}

function stopRecording() {
  mediaRecorder?.stop();
}

function renderWaveToSparkline() {
  const blob : Blob = new Blob(audioChunks, { type: "audio/webm; codecs=opus" });

  blob.arrayBuffer().then((arrayBuffer : ArrayBuffer) => {
    const audioContext : AudioContext = new AudioContext();
    // One annoying thing about decodeAudioData is that it resamples the incoming audio data into
    // a target bit rate, which does take time :/

    audioContext.decodeAudioData(arrayBuffer).then((audioBuffer : AudioBuffer) : void => {
      if (audioBuffer.length > 1000000) {
        stopRecording();
      }

      window.requestAnimationFrame(() => {
        if (sparkline && canvasLarge) {
          let values : number[] = Array.prototype.slice.call(audioBuffer.getChannelData(0));

          /**
           * This is the important part! Render a sparkline using some data stored here in 'values' array.
           */
          sparkline.renderWaveForm(canvasLarge, values, 0, 0, width, height, {
            backgroundColor: 0xFFCC4444,
            foregroundColor: 0xFFFFFFFF,
            fillBackground: true,
            sampleRate: audioBuffer.sampleRate,
            verticalTicks: [{
              ms: 100,
              height: 10,
              color: 0xFF888888
            }, {
              ms: 1000,
              height: 20,
              color: 0xFFCCCCCC
            }]
          });

          sparkline.renderWaveForm(canvasSmall, values, 0, 0, Math.floor(width / 3), Math.floor(height / 3), {
            backgroundColor: 0xFFFFFFFF,
            foregroundColor: 0xFF33EE33,
            fillBackground: true
          });
        }
      });
    })
  })
}

function setupCanvas(width : number, height : number) {
  canvasLarge = document.getElementById('canvas-large') as HTMLCanvasElement;

  canvasLarge.width = width;
  canvasLarge.height = height;

  canvasSmall = document.getElementById('canvas-small') as HTMLCanvasElement;

  canvasSmall.width = width / 3;
  canvasSmall.height = height / 3;
}

function setupRecordingButton() {
  const button : HTMLButtonElement = document.getElementById('btn-record') as HTMLButtonElement;

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
}

if (typeof window !== 'undefined') {
  initialize();
}
