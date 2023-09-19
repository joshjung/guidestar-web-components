export type SparklineOptions = {
    profile?: boolean;
    ready: () => void;
};
type SparklineWasmModule = {
    _renderWave: (width: number, height: number, dataPtr: number, length: number, backgroundColor: number, foregroundColor: number, fillBackground: boolean) => number;
    _mallocFloatBuffer: (size: number) => number;
    _freeFloatBuffer: (dataPtr: number) => void;
    _freeRenderMemory: () => void;
    HEAPU8: Uint8Array;
    HEAPF32: Float32Array;
};
export type RenderWaveOptions = {
    backgroundColor?: number;
    foregroundColor?: number;
    fillBackground?: boolean;
};
export default class Sparkline {
    module: SparklineWasmModule | null;
    dataPtr: number | null;
    options: SparklineOptions;
    constructor(options: SparklineOptions);
    /**
     * Render an audio-wave looking sparkline. This renders once and then cleans up memory preparing for another render.
     *
     * @param canvas The canvas to render to.
     * @param data A series of numbers to render, where values magnitude is determined by their distance from 0.0.
     * @param width The width of the rendered image
     * @param height The height of the rendered image
     * @param options The optional RenderWaveOptions to choose how to render.
     */
    renderWave(canvas: HTMLCanvasElement, data: number[], width: number, height: number, options?: RenderWaveOptions): void;
}
export {};
