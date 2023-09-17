import sparkline from "../build/temp/sparkline-wasm";

const SparklineWASMModule : any = {
  print: function(text : string, ...other : string[]) {
    if (other.length > 0) text = text + ' ' + Array.prototype.slice.call(other).join(' ');
    console.log(text);
  },
  canvas: (() => {
    const canvas : HTMLElement | null = document.getElementById('canvas');

    if (canvas) {
      // As a default initial behavior, pop up an alert when webgl context is lost. To make your
      // application robust, you may want to override this behavior before shipping!
      // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
      canvas.addEventListener("webglcontextlost", (e : Event) => {
        alert('WebGL context lost. You will need to reload the page.');
        e.preventDefault();
      }, false);
    }

    return canvas;
  })()
};

sparkline(SparklineWASMModule).then(() => {
  console.log("WASM Loaded!");
});

