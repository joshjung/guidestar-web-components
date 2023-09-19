#!/bin/bash

rm -rf dist && mkdirp dist
rm -rf build && mkdirp build

emcc ./src/sparkline.c \
  -Os \
  -o ./build/sparkline-wasm.js \
  -sMODULARIZE=1 \
  -sEXPORT_ES6=1 \
  -sEXPORTED_FUNCTIONS=_renderWave,_mallocFloatBuffer,_freeRenderMemory,_freeFloatBuffer \
  -s TOTAL_MEMORY=16MB \
  -s "ENVIRONMENT='web'"
