import sparkline from "../build/sparkline-wasm";

export type SparklineOptions = {
  profile? : boolean
  ready : () => void
}

type SparklineWasmModule = {
  _renderWave: (width : number, height : number, dataPtr : number, length : number, backgroundColor : number, foregroundColor : number, fillBackground : boolean) => number
  _mallocFloatBuffer : (size : number) => number
  _freeFloatBuffer : (dataPtr : number) => void,
  _freeRenderMemory : () => void,
  HEAPU8 : Uint8Array
  HEAPF32 : Float32Array
}

export type RenderWaveOptions = {
  backgroundColor? : number
  foregroundColor? : number
  fillBackground? : boolean
}

// See: https://compile.fi/canvas-filled-three-ways-js-webassembly-and-webgl/
export default class Sparkline {
  module : SparklineWasmModule | null = null
  dataPtr : number | null = null
  options : SparklineOptions

  constructor(options : SparklineOptions) {
    this.options = options;

    sparkline({
      print: function (text: string, ...other: string[]) {
        if (other.length > 0) text = text + ' ' + Array.prototype.slice.call(other).join(' ');
        console.log(text);
      }
    }).then((module : SparklineWasmModule) => {
      this.module = module
      options.ready();
    });
  }

  /**
   * Render an audio-wave looking sparkline. This renders once and then cleans up memory preparing for another render.
   *
   * @param canvas The canvas to render to.
   * @param data A series of numbers to render, where values magnitude is determined by their distance from 0.0.
   * @param width The width of the rendered image
   * @param height The height of the rendered image
   * @param options The optional RenderWaveOptions to choose how to render.
   */
  renderWave(canvas : HTMLCanvasElement, data : number[], width : number, height : number, options : RenderWaveOptions = {}) : void {
    if (!this.module) {
      throw new Error('Do not call renderWave until Sparkline is ready!');
    }

    let start : DOMHighResTimeStamp | undefined = undefined;
    if (this.options.profile) {
      start = window.performance.now();
    }

    const ctx : CanvasRenderingContext2D | null = canvas.getContext(
      '2d',
      {
        alpha: false,
        antialias: false,
        depth: false
      }
    ) as CanvasRenderingContext2D;

    if (!ctx) {
      throw 'Your browser does not support canvas';
    }

    const {
      backgroundColor = 0xFFCCCCCC,
      foregroundColor = 0xFFEE1111
    } = options;

    // We need to put our data into the sparkline WASM memory so it can be used
    // We have to initialize some memory within the heap of the WebAssembly context to store the data...
    this.dataPtr = this.module._mallocFloatBuffer(data.length)
    const dataArray : Float32Array = new Float32Array(this.module.HEAPF32.buffer, this.dataPtr, data.length);

    // Copy our points into the heap memory of WASM...
    for (let i : number = 0; i < data.length; i++) {
      dataArray[i] = data[i];
    }

    // Render using WASM!
    const pixelDataPtr : number = this.module._renderWave(width, height, this.dataPtr, data.length, backgroundColor, foregroundColor, true);
    const pixels : Uint8ClampedArray = new Uint8ClampedArray(this.module.HEAPU8.buffer, pixelDataPtr, width * height * 4);

    const img : ImageData = new ImageData(pixels, width, height);

    ctx.putImageData(img, 0, 0);

    // Cleanup!
    this.module._freeRenderMemory();
    this.module._freeFloatBuffer(this.dataPtr);
    this.dataPtr = null;

    if (this.options.profile && start) {
      let end : DOMHighResTimeStamp = window.performance.now();

      console.log('Sparkline::renderWave took ' + (end - start) + ' milliseconds to render ', data.length + ` samples into a ${width}x${height} canvas.`);
    }
  }
}


