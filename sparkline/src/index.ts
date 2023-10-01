import sparkline from "../build/sparkline-wasm";

export type SparklineOptions = {
  profile? : boolean
  ready? : () => void
}

type SparklineWasmModule = {
  _fill: (pixelPtr : number, backgroundColor : number, xStart : number, xEnd : number, yStart : number, yEnd : number, width :number) => void
  _fillBuffer: (pixelPtr : number, backgroundColor : number, length :number) => void
  _renderWaveForm: (pixelPtr : number, x : number, y : number, width : number, height : number, dataPtr : number, length : number, backgroundColor : number, foregroundColor : number, fillBackground : boolean) => void,
  _renderVerticalLine: (pixelPtr : number, x : number, lineWidth : number, width : number, height : number, foregroundColor : number) => void
  _renderVerticalTicks: (pixelPtr : number, xStart : number, xEnd : number, xGap : number, tickWidth : number, tickHeight : number, width : number, height : number, foregroundColor : number) => void
  _mallocFloatBuffer : (size : number) => number
  _mallocPixelBuffer: (width : number, height : number) => number
  _freeFloatBuffer : (dataPtr : number) => void
  _freePixelBuffer : (dataPtr : number) => void
  HEAPU8 : Uint8Array
  HEAPF32 : Float32Array
}

export type RenderWaveFormVerticalTick = {
  color : number
  ms : number
  height : number
  offsetMs? : number
}

export type RenderWaveFormOptions = {
  backgroundColor? : number
  foregroundColor? : number
  fillBackground? : boolean
  alpha? : boolean,
  verticalLineX? : number | undefined
  verticalLineColor? : number | undefined
  verticalTicks? : RenderWaveFormVerticalTick[] | undefined
  sampleRate? : number
}

// See: https://compile.fi/canvas-filled-three-ways-js-webassembly-and-webgl/
export default class Sparkline {
  private _initPromise? : Promise<void> = undefined;

  module : SparklineWasmModule | null = null
  dataPtr : number | null = null
  pixelPtr : number | null = null
  options : SparklineOptions

  constructor(options? : SparklineOptions) {
    this.options = options || {};

    this._initPromise = new Promise(resolve => {
      sparkline({
        print: function (text: string, ...other: string[]) {
          if (other.length > 0) text = text + ' ' + Array.prototype.slice.call(other).join(' ');
          console.log(text);
        }
      }).then((module : SparklineWasmModule) => {
        this.module = module;

        if (this.options.ready) {
          this.options.ready();
        }

        resolve();
      });
    })
  }

  init() : Promise<void> {
    return this._initPromise as Promise<void>;
  }

  /**
   * Render an audio-wave looking sparkline. This renders once and then cleans up memory preparing for another render.
   *
   * @param canvas The canvas to render to.
   * @param data A series of numbers to render, where values magnitude is determined by their distance from 0.0.
   * @param x The x location to render into
   * @param y The y location to render into
   * @param width The width of the rendered image
   * @param height The height of the rendered image
   * @param options The optional RenderWaveFormOptions to choose how to render.
   */
  renderWaveForm(canvas : HTMLCanvasElement, data : number[], x : number, y : number, width : number, height : number, options : RenderWaveFormOptions = {}) : void {
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
        alpha: options.alpha !== undefined ? options.alpha : false,
        antialias: false,
        depth: false
      }
    ) as CanvasRenderingContext2D;

    if (!ctx) {
      throw 'Your browser does not support canvas';
    }

    const {
      backgroundColor = 0xFFCCCCCC,
      foregroundColor = 0xFFEE1111,
      verticalLineX,
      verticalLineColor = 0xFF0000FF
    } = options;

    // We need to put our data into the sparkline WASM memory so it can be used
    // We have to initialize some memory within the heap of the WebAssembly context to store the data...
    this.pixelPtr = this.module._mallocPixelBuffer(width - x, height - y);
    this.dataPtr = this.module._mallocFloatBuffer(data.length)

    const dataArray : Float32Array = new Float32Array(this.module.HEAPF32.buffer, this.dataPtr, data.length);

    // Copy our points into the heap memory of WASM...
    for (let i : number = 0; i < data.length; i++) {
      dataArray[i] = data[i];
    }

    // Render using WASM!
    this.module._renderWaveForm(this.pixelPtr, x, y, width, height, this.dataPtr, data.length, backgroundColor, foregroundColor, true);

    if (verticalLineX !== undefined) {
      this.module._renderVerticalLine(this.pixelPtr, verticalLineX, 3, width, height, verticalLineColor);
    }

    const { verticalTicks } = options;

    if (verticalTicks && verticalTicks.length) {
      if (!options.sampleRate) {
        throw new Error('You must provide a sampleRate in order to use verticalTicks! (e.g. sampleRate: 44100)');
      }

      verticalTicks.forEach(vt => {
        const totalMillis: number = (data.length / (options.sampleRate as number)) * 1000;
        const pixelsPerMilli = width / totalMillis;

        const gap = pixelsPerMilli * vt.ms;
        const xStart = vt.offsetMs ? -(vt.offsetMs * pixelsPerMilli) : 0;
        this.module?._renderVerticalTicks(this.pixelPtr as number, xStart, width, gap, 3, vt.height, width, height, vt.color);
      });
    }

    const img : ImageData = new ImageData(new Uint8ClampedArray(this.module.HEAPU8.buffer, this.pixelPtr, width * height * 4), width, height);

    ctx.putImageData(img, 0, 0);

    // Cleanup!
    this.module._freeFloatBuffer(this.dataPtr);
    this.module._freePixelBuffer(this.pixelPtr);
    this.dataPtr = null;
    this.pixelPtr = null;

    if (this.options.profile && start) {
      let end : DOMHighResTimeStamp = window.performance.now();

      console.log('Sparkline::renderWaveForm took ' + (end - start) + ' milliseconds to render ', data.length + ` samples into a ${width}x${height} canvas.`);
    }
  }
}


