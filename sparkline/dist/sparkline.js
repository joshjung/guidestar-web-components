/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sparkline"] = factory();
	else
		root["sparkline"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./build/sparkline-wasm.js":
/*!*********************************!*\
  !*** ./build/sparkline-wasm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nvar Module = (() => {\n  var _scriptDir = \"file:///Users/joshjung/dev/jung-web-components/sparkline/build/sparkline-wasm.js\";\n  \n  return (\nfunction(moduleArg = {}) {\n\nvar Module=moduleArg;var readyPromiseResolve,readyPromiseReject;Module[\"ready\"]=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram=\"./this.program\";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var scriptDirectory=\"\";function locateFile(path){if(Module[\"locateFile\"]){return Module[\"locateFile\"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=\"undefined\"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf(\"blob:\")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,\"\").lastIndexOf(\"/\")+1)}else{scriptDirectory=\"\"}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,false);xhr.responseType=\"arraybuffer\";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,true);xhr.responseType=\"arraybuffer\";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module[\"print\"]||console.log.bind(console);var err=Module[\"printErr\"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module[\"arguments\"])arguments_=Module[\"arguments\"];if(Module[\"thisProgram\"])thisProgram=Module[\"thisProgram\"];if(Module[\"quit\"])quit_=Module[\"quit\"];var wasmBinary;if(Module[\"wasmBinary\"])wasmBinary=Module[\"wasmBinary\"];var noExitRuntime=Module[\"noExitRuntime\"]||true;if(typeof WebAssembly!=\"object\"){abort(\"no native wasm support detected\")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module[\"HEAP8\"]=HEAP8=new Int8Array(b);Module[\"HEAP16\"]=HEAP16=new Int16Array(b);Module[\"HEAPU8\"]=HEAPU8=new Uint8Array(b);Module[\"HEAPU16\"]=HEAPU16=new Uint16Array(b);Module[\"HEAP32\"]=HEAP32=new Int32Array(b);Module[\"HEAPU32\"]=HEAPU32=new Uint32Array(b);Module[\"HEAPF32\"]=HEAPF32=new Float32Array(b);Module[\"HEAPF64\"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module[\"preRun\"]){if(typeof Module[\"preRun\"]==\"function\")Module[\"preRun\"]=[Module[\"preRun\"]];while(Module[\"preRun\"].length){addOnPreRun(Module[\"preRun\"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module[\"postRun\"]){if(typeof Module[\"postRun\"]==\"function\")Module[\"postRun\"]=[Module[\"postRun\"]];while(Module[\"postRun\"].length){addOnPostRun(Module[\"postRun\"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module[\"monitorRunDependencies\"]){Module[\"monitorRunDependencies\"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module[\"monitorRunDependencies\"]){Module[\"monitorRunDependencies\"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module[\"onAbort\"]){Module[\"onAbort\"](what)}what=\"Aborted(\"+what+\")\";err(what);ABORT=true;EXITSTATUS=1;what+=\". Build with -sASSERTIONS for more info.\";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix=\"data:application/octet-stream;base64,\";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}var wasmBinaryFile;if(Module[\"locateFile\"]){wasmBinaryFile=\"sparkline-wasm.wasm\";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}}else{wasmBinaryFile=new URL(/* asset import */ __webpack_require__(/*! sparkline-wasm.wasm */ \"./build/sparkline-wasm.wasm\"), __webpack_require__.b).href}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw\"both async and sync fetching of the wasm failed\"}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==\"function\"){return fetch(binaryFile,{credentials:\"same-origin\"}).then(response=>{if(!response[\"ok\"]){throw\"failed to load wasm binary file at '\"+binaryFile+\"'\"}return response[\"arrayBuffer\"]()}).catch(()=>getBinarySync(binaryFile))}}return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming==\"function\"&&!isDataURI(binaryFile)&&typeof fetch==\"function\"){return fetch(binaryFile,{credentials:\"same-origin\"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err(`wasm streaming compile failed: ${reason}`);err(\"falling back to ArrayBuffer instantiation\");return instantiateArrayBuffer(binaryFile,imports,callback)})})}return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={\"a\":wasmImports};function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports[\"b\"];updateMemoryViews();addOnInit(wasmExports[\"c\"]);removeRunDependency(\"wasm-instantiate\");return wasmExports}addRunDependency(\"wasm-instantiate\");function receiveInstantiationResult(result){receiveInstance(result[\"instance\"])}if(Module[\"instantiateWasm\"]){try{return Module[\"instantiateWasm\"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);readyPromiseReject(e)}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult).catch(readyPromiseReject);return{}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var abortOnCannotGrowMemory=requestedSize=>{abort(\"OOM\")};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;abortOnCannotGrowMemory(requestedSize)};var wasmImports={a:_emscripten_resize_heap};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports[\"c\"])();var _freeRenderMemory=Module[\"_freeRenderMemory\"]=()=>(_freeRenderMemory=Module[\"_freeRenderMemory\"]=wasmExports[\"d\"])();var _renderWave=Module[\"_renderWave\"]=(a0,a1,a2,a3,a4,a5,a6)=>(_renderWave=Module[\"_renderWave\"]=wasmExports[\"e\"])(a0,a1,a2,a3,a4,a5,a6);var _mallocFloatBuffer=Module[\"_mallocFloatBuffer\"]=a0=>(_mallocFloatBuffer=Module[\"_mallocFloatBuffer\"]=wasmExports[\"f\"])(a0);var _freeFloatBuffer=Module[\"_freeFloatBuffer\"]=a0=>(_freeFloatBuffer=Module[\"_freeFloatBuffer\"]=wasmExports[\"g\"])(a0);var ___errno_location=()=>(___errno_location=wasmExports[\"__errno_location\"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module[\"calledRun\"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module[\"onRuntimeInitialized\"])Module[\"onRuntimeInitialized\"]();postRun()}if(Module[\"setStatus\"]){Module[\"setStatus\"](\"Running...\");setTimeout(function(){setTimeout(function(){Module[\"setStatus\"](\"\")},1);doRun()},1)}else{doRun()}}if(Module[\"preInit\"]){if(typeof Module[\"preInit\"]==\"function\")Module[\"preInit\"]=[Module[\"preInit\"]];while(Module[\"preInit\"].length>0){Module[\"preInit\"].pop()()}}run();\n\n\n  return moduleArg.ready\n}\n\n);\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Module);\n\n//# sourceURL=webpack://sparkline/./build/sparkline-wasm.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _build_sparkline_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../build/sparkline-wasm */ \"./build/sparkline-wasm.js\");\n\n// See: https://compile.fi/canvas-filled-three-ways-js-webassembly-and-webgl/\nvar Sparkline = /** @class */ (function () {\n    function Sparkline(options) {\n        var _this = this;\n        this.module = null;\n        this.dataPtr = null;\n        this.options = options;\n        (0,_build_sparkline_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            print: function (text) {\n                var other = [];\n                for (var _i = 1; _i < arguments.length; _i++) {\n                    other[_i - 1] = arguments[_i];\n                }\n                if (other.length > 0)\n                    text = text + ' ' + Array.prototype.slice.call(other).join(' ');\n                console.log(text);\n            }\n        }).then(function (module) {\n            _this.module = module;\n            options.ready();\n        });\n    }\n    /**\n     * Render an audio-wave looking sparkline. This renders once and then cleans up memory preparing for another render.\n     *\n     * @param canvas The canvas to render to.\n     * @param data A series of numbers to render, where values magnitude is determined by their distance from 0.0.\n     * @param width The width of the rendered image\n     * @param height The height of the rendered image\n     * @param options The optional RenderWaveOptions to choose how to render.\n     */\n    Sparkline.prototype.renderWave = function (canvas, data, width, height, options) {\n        if (options === void 0) { options = {}; }\n        if (!this.module) {\n            throw new Error('Do not call renderWave until Sparkline is ready!');\n        }\n        var start = undefined;\n        if (this.options.profile) {\n            start = window.performance.now();\n        }\n        var ctx = canvas.getContext('2d', {\n            alpha: false,\n            antialias: false,\n            depth: false\n        });\n        if (!ctx) {\n            throw 'Your browser does not support canvas';\n        }\n        var _a = options.backgroundColor, backgroundColor = _a === void 0 ? 0xFFCCCCCC : _a, _b = options.foregroundColor, foregroundColor = _b === void 0 ? 0xFFEE1111 : _b;\n        // We need to put our data into the sparkline WASM memory so it can be used\n        // We have to initialize some memory within the heap of the WebAssembly context to store the data...\n        this.dataPtr = this.module._mallocFloatBuffer(data.length);\n        var dataArray = new Float32Array(this.module.HEAPF32.buffer, this.dataPtr, data.length);\n        // Copy our points into the heap memory of WASM...\n        for (var i = 0; i < data.length; i++) {\n            dataArray[i] = data[i];\n        }\n        // Render using WASM!\n        var pixelDataPtr = this.module._renderWave(width, height, this.dataPtr, data.length, backgroundColor, foregroundColor, true);\n        var pixels = new Uint8ClampedArray(this.module.HEAPU8.buffer, pixelDataPtr, width * height * 4);\n        var img = new ImageData(pixels, width, height);\n        ctx.putImageData(img, 0, 0);\n        // Cleanup!\n        this.module._freeRenderMemory();\n        this.module._freeFloatBuffer(this.dataPtr);\n        this.dataPtr = null;\n        if (this.options.profile && start) {\n            var end = window.performance.now();\n            console.log('Sparkline::renderWave took ' + (end - start) + ' milliseconds to render ', data.length + \" samples into a \".concat(width, \"x\").concat(height, \" canvas.\"));\n        }\n    };\n    return Sparkline;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sparkline);\n\n\n//# sourceURL=webpack://sparkline/./src/index.ts?");

/***/ }),

/***/ "./build/sparkline-wasm.wasm":
/*!***********************************!*\
  !*** ./build/sparkline-wasm.wasm ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = \"data:application/wasm;base64,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\";\n\n//# sourceURL=webpack://sparkline/./build/sparkline-wasm.wasm?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});