# Sparkline

A Web-Assembly sparkline (mini-chart) control.

Designed to be as absolutely fast as possible.

# Usage

    import Sparkline from '@guidestar-web-components/sparkline'

    const sparkline = new Sparkline({
      ready: () => {
        sparkline.renderWave(canvas, width, height, data, {
          backgroundColor: 0xFFCCAA88,   // Colors are 0x[ALPHA][BLUE][GREEN][RED]
          foregroundColor: 0xFFAAAAAA,
          fillBackground: true
        });
      }
    });

# Getting Started

You will need to install [Emscripten](https://emscripten.org/index.html) and ensure that `emcc` is available on your path.

# Local Development

    npm run dev

This will startup a really rudimentary `chokidar` watching the sparkline directory and rebuilding whenever
it sees a change in the `.c` or `.ts` files.

It then starts a mini web-server at `localhost:8080` where you can see a demo of the audio wave-form working.

# Build

    npm run build
