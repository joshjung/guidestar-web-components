#!/bin/bash

(http-server ../demos/sparkline/dist &) && \
  chokidar "src/**/*.{ts,c,html}" \
    --initial \
    -c "rm -rf dist && mkdirp dist && ./build/emcc.sh && webpack && (cd ../demos/sparkline && npm run dev)"
