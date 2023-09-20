import Sparkline from '@guidestar/sparkline';

const maxSamplesToRender : number = 500000;

const width: number = 700;
const height: number = 100;
let recording : boolean = false;
let mediaRecorder : MediaRecorder | null = null;
let audio: Blob | null = null;
let sparkline : Sparkline | undefined = undefined;
let canvas :HTMLCanvasElement | undefined = undefined;
let chunks : any[] = [];

function initialize() {
  createRecordingButtons();
  createSparklineCanvas(width, height);
}

function startRecording() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
        mediaRecorder.start(50);
        mediaRecorder.ondataavailable = (e : BlobEvent) => {
          chunks.push(e.data)
          audio = new Blob(chunks);

          renderWaveToSparkline()
        };
        mediaRecorder.onstop = () => {
          chunks = [];
        }
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
      if (!sparkline || !canvas) {
        throw new Error('sparkline, or canvas was null');
      }

      let values : number[] = Array.prototype.slice.call(audioBuffer.getChannelData(0));
      let offsetMs : number = 0;

      if (values.length > maxSamplesToRender) {
        offsetMs = ((values.length % maxSamplesToRender) / audioBuffer.sampleRate) * 1000;
        values = values.slice(values.length - maxSamplesToRender);
      }

      /**
       * This is the important part! Render a sparkline using some data stored here in 'values' array.
       *
       * TODO: we need a way to tell the sparkline to reuse the memory for the pixels here because
       *       there is no point in reallocating memory every single time.
       */
      sparkline.renderWaveForm(canvas, values, width, height, {
        backgroundColor: 0xFFCC4444,
        foregroundColor: 0xFFFFFFFF,
        fillBackground: true,
        sampleRate: audioBuffer.sampleRate,
        verticalTicks: [{
          ms: 100,
          height: 10,
          color: 0xFF888888,
          offsetMs
        }, {
          ms: 1000,
          height: 20,
          color: 0xFFCCCCCC,
          offsetMs
        }]
      });
    })
  })
}

function createSparklineCanvas(width : number, height : number) {
  canvas = document.createElement('canvas');

  canvas.id = "CursorLayer";
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = '8';
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  const body : HTMLBodyElement = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
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

  /**
   * Here is where we create a new Sparkline object, and of course we could listen to the ready() callback if
   * we need to do something immediately when the WASM stuff is loaded and ready to go.
   */
  sparkline = new Sparkline({
    profile: true,
    ready: () => {
      console.log('Sparkline is ready to render!');
    }
  });
}
