# Sparkline

A Web-Assembly sparkline (mini-chart) control written in C and TypeScript. Designed to be fast.

# Installation

    npm i -S @guidestar/sparkline

# Performance

Using web assembly to write the pixels directly, this control can render 1 million audio
samples in roughly 15 milliseconds on my Macbook Air M1. 

Run the demo and open your console to see it live. 

# Demo: Waveform / Oscillogram)

The demo application code can be found in `demos/sparkline`.

Run the demo:

    cd demos/sparkline
    npm run demo

Grant website access to your microphone and then click "Start Recording..." Two
oscillograms will demonstrate rendering to canvases.

![Demonstraction of the sparkline in action](https://i.imgur.com/EvVZtAO.gif)

# Example (Basic)

    import Sparkline from '@guidestar/sparkline'

    // Note: You need to get a HTML <canvas> instance at some point here before
    // calling renderWave.

    ...

    const width = 500;
    const height = 200;

    const data = [];
    for (let i = 0; i < 10000; i++) data[i] = Math.random()

    const sparkline = new Sparkline({
      ready: () => {
        sparkline.renderWaveForm(canvas, data, width, height, {
          backgroundColor: 0xFFCCAA88,   // Colors are 0x[ALPHA][BLUE][GREEN][RED]
          foregroundColor: 0xFFAAAAAA,
          fillBackground: true
        });
      }
    });

# Example (Ticks)

You can render ticks every X milliseconds rather easily, with custom colors:


    import Sparkline from '@guidestar/sparkline'

    const data = [...]; // Get an array with lots of numbers...

    const sampleRate = 8000; // This is the sample rate of your audio, in samples per second.

    let sparklineReady = false;

    const sparkline = new Sparkline({
      ready: () => sparklineReady = true
    });

    ...

    if (sparklineReady) {
      sparkline.renderWaveForm(canvas, data, width, height, {
        backgroundColor: 0xFFCC4444,
        foregroundColor: 0xFFFFFFFF,
        sampleRate, // required to know where to mark the ticks
        verticalTicks: [{
          ms: 100, // A medium grey tick every 100 milliseconds
          height: 10,
          color: 0xFF888888
        }, {
          ms: 1000, // A lighter grey tick every 1 second
          height: 20,
          color: 0xFFCCCCCC
        }]
      });
    }

# Development

You will need to install [Emscripten](https://emscripten.org/index.html) and ensure that `emcc` is available on your path.

Once that is done, you can cd into the `/sparkline` directory (NOT the demo directory) and:

    npm run dev

This will startup a really rudimentary `chokidar` watching the sparkline directory and rebuilding whenever
it sees a change in the `.c` or `.ts` files.

It then starts a mini web-server at `localhost:8080` where you can see a demo of the audio wave-form working.

# Build

Building involves compiling the C code to WASM, which is then base-64d and built into a webpack bundled
Javascript file. You can see the final file in `dist/sparkline.js`.


    npm run build


# License

The MIT License (MIT)

Copyright (c) 2023 Joshua Jung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
