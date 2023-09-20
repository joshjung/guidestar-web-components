export type SparklineOptions = {
    profile?: boolean;
    ready: () => void;
};
type SparklineWasmModule = {
    _fill: (pixelPtr: number, backgroundColor: number, xStart: number, xEnd: number, yStart: number, yEnd: number, width: number) => void;
    _fillBuffer: (pixelPtr: number, backgroundColor: number, length: number) => void;
    _renderWaveForm: (pixelPtr: number, x: number, y: number, width: number, height: number, dataPtr: number, length: number, backgroundColor: number, foregroundColor: number, fillBackground: boolean) => void;
    _renderVerticalLine: (pixelPtr: number, x: number, lineWidth: number, width: number, height: number, foregroundColor: number) => void;
    _renderVerticalTicks: (pixelPtr: number, xStart: number, xEnd: number, xGap: number, tickWidth: number, tickHeight: number, width: number, height: number, foregroundColor: number) => void;
    _mallocFloatBuffer: (size: number) => number;
    _mallocPixelBuffer: (width: number, height: number) => number;
    _freeFloatBuffer: (dataPtr: number) => void;
    _freePixelBuffer: (dataPtr: number) => void;
    HEAPU8: Uint8Array;
    HEAPF32: Float32Array;
};
export type RenderWaveFormVerticalTick = {
    color: number;
    ms: number;
    height: number;
    offsetMs?: number;
};
export type RenderWaveFormOptions = {
    backgroundColor?: number;
    foregroundColor?: number;
    fillBackground?: boolean;
    alpha?: boolean;
    verticalLineX?: number | undefined;
    verticalLineColor?: number | undefined;
    verticalTicks?: RenderWaveFormVerticalTick[] | undefined;
    sampleRate?: number;
};
export default class Sparkline {
    module: SparklineWasmModule | null;
    dataPtr: number | null;
    pixelPtr: number | null;
    options: SparklineOptions;
    constructor(options: SparklineOptions);
    /**
     * Render an audio-wave looking sparkline. This renders once and then cleans up memory preparing for another render.
     *
     * @param canvas The canvas to render to.
     * @param data A series of numbers to render, where values magnitude is determined by their distance from 0.0.
     * @param width The width of the rendered image
     * @param height The height of the rendered image
     * @param options The optional RenderWaveFormOptions to choose how to render.
     */
    renderWaveForm(canvas: HTMLCanvasElement, data: number[], width: number, height: number, options?: RenderWaveFormOptions): void;
}
export {};
