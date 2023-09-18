import sparkline from "../build/temp/sparkline-wasm";

export type SparklineOptions = {
  canvas : HTMLCanvasElement
  ready : () => void
}

export type SparklineWasmModule = {
  _renderWave: (width : number, height : number, dataPtr : number, length : number) => number
  _mallocFloatBuffer : (size : number) => number
  HEAPU8 : Uint8Array
  HEAPF32 : Float32Array
}

// See: https://compile.fi/canvas-filled-three-ways-js-webassembly-and-webgl/
export default class Sparkline {
  module : SparklineWasmModule | null = null
  ctx : CanvasRenderingContext2D | null = null

  constructor(options : SparklineOptions) {
    const { canvas, ready } = options;

    this.ctx = canvas.getContext(
      '2d',
      {
        alpha: false,
        antialias: false,
        depth: false
      }
    ) as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw 'Your browser does not support canvas';
    }

    sparkline({
      print: function (text: string, ...other: string[]) {
        if (other.length > 0) text = text + ' ' + Array.prototype.slice.call(other).join(' ');
        console.log(text);
      }
    }).then((module : SparklineWasmModule) => {
      this.module = module
      ready();
    });
  }

  renderWave(data : number[], width : number, height : number) : void {
    if (!this.module || !this.ctx) {
      throw new Error('Wait until Sparkline is ready!');
    }

    // We need to put our data into the sparkline WASM memory so it can be used
    const dataPtr : number = this.module._mallocFloatBuffer(data.length)
    const dataArray : Float32Array = new Float32Array(this.module.HEAPF32.buffer, dataPtr, data.length);

    for (let i : number = 0; i < data.length; i++) {
      dataArray[i] = data[i]
    }

    // Render!
    const pointer : number = this.module._renderWave(width, height, dataPtr, data.length);
    const clampedArray : Uint8ClampedArray = new Uint8ClampedArray(this.module.HEAPU8.buffer, pointer, width * height * 4);

    const img : ImageData = new ImageData(clampedArray, width, height);

    this.ctx.putImageData(img, 0, 0);
  }
}


