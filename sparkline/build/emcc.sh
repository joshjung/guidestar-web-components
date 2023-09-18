#!/bin/bash

mkdirp ./build/temp

emcc ./src/sparkline.c \
  -Os \
  -o ./build/temp/sparkline-wasm.js \
  -sMODULARIZE=1 \
  -sEXPORT_ES6=1 \
  -sEXPORTED_FUNCTIONS=_renderWave,_mallocFloatBuffer \
  -sEXPORTED_RUNTIME_METHODS=ccall \
  -s TOTAL_MEMORY=2MB \
  -s "ENVIRONMENT='web'"
