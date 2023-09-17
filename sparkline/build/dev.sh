#!/bin/bash

(http-server dist &) && \
  chokidar "src/**/*.{ts,c,html}" \
    --initial \
    -c "rm -rf dist && mkdirp dist/assets && ./build/emcc.sh && webpack"
