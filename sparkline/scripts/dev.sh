#!/bin/bash

(http-server ../demos/sparkline/dist &) && \
  chokidar "src/**/*.{ts,c,html}" \
    --initial \
    -c "./scripts/emcc.sh && webpack && (cd ../demos/sparkline && npm run dev)"
