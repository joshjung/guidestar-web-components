#!/bin/bash

mkdirp ./build/temp

emcc ./src/sparkline.c \
  -o ./build/temp/sparkline-wasm.js \
  -sMODULARIZE=1 \
  -sEXPORT_ES6=1 \
  -sEXPORTED_FUNCTIONS=_main,_console_log \
  -sEXPORTED_RUNTIME_METHODS=ccall \
  -s "ENVIRONMENT='web'"
