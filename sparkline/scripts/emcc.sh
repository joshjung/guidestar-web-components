#!/bin/bash

rm -rf dist && mkdirp dist
rm -rf build && mkdirp build

emcc ../shared/wasm/memory.c ../shared/wasm/renderer.c ./src/sparkline.c \
  -Os \
  -o ./build/sparkline-wasm.js \
  -sMODULARIZE=1 \
  -sEXPORT_ES6=1 \
  -sEXPORTED_FUNCTIONS=_renderWaveForm,_mallocFloatBuffer,_mallocPixelBuffer,_freeFloatBuffer,_freePixelBuffer,_fill,_fillBuffer,_renderVerticalLine,_renderVerticalTicks \
  -s TOTAL_MEMORY=32mb \
  -s "ENVIRONMENT='web'"
