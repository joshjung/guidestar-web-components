# Sparkline

A Web-Assembly sparkline (mini-chart) control.

Designed to be as absolutely fast as possible.

# Performance

Using web assembly to write the pixels directly, this control can render 1 million samples in roughly 15 milliseconds 
on my Macbook Air M1. Run the demo and open your console to see it live. 

# Demo

The demo application code can be found in `demos/sparkline`.

To run the demo, see instructions for `Development` below.

![Demonstraction of the sparkline in action](https://i.imgur.com/b2lRnIN.gif)

# Usage

    import Sparkline from '@guidestar/sparkline'

    const sparkline = new Sparkline({
      ready: () => {
        sparkline.renderWave(canvas, width, height, data, {
          backgroundColor: 0xFFCCAA88,   // Colors are 0x[ALPHA][BLUE][GREEN][RED]
          foregroundColor: 0xFFAAAAAA,
          fillBackground: true
        });
      }
    });

# Development

You will need to install [Emscripten](https://emscripten.org/index.html) and ensure that `emcc` is available on your path.

Once that is done, you can cd into the `/sparkline` directory (NOT the demo directory) and:

    npm run dev

This will startup a really rudimentary `chokidar` watching the sparkline directory and rebuilding whenever
it sees a change in the `.c` or `.ts` files.

It then starts a mini web-server at `localhost:8080` where you can see a demo of the audio wave-form working.

# Build

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
