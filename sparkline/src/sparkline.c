#include <emscripten.h>
#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include "float.h"
#include <malloc.h>

/**
 * Fill buffer.
 */
void fillBuffer(unsigned int *pixels, unsigned int backgroundColor, int length) {
  for (int i = 0; i < length; i++) {
    pixels[i] = backgroundColor;
  }
}

/**
 * Fill pixels with a color.
 */
void fill(unsigned int *pixels, unsigned int backgroundColor, int xStart, int xEnd, int yStart, int yEnd, int width) {
  for (int y = yStart; y < yEnd; y++) {
    int yw = y * width;
      for (int x = xStart; x < xEnd; x++) {
        pixels[yw + x] = backgroundColor;
    }
  }
}

/**
 * Render an oscillogram pixel by pixel based on the input samples.
 */
void renderWaveForm(
    unsigned int *pixels,
    int topLeftX,
    int topLeftY,
    int width,
    int height,
    float* samples,
    int length,
    unsigned int backgroundColor,
    unsigned int foregroundColor,
    bool fillBackground
) {
  float min = FLT_MAX;
  float max = FLT_MIN;

  for (int j = 0; j < length; j++) {
    min = fmin(min, samples[j]);
    max = fmax(max, samples[j]);
  }

  float range = max - min;

  if (fillBackground) {
    fill(pixels, backgroundColor, topLeftX, width, topLeftY, height, width);
  }

  float xJump = (float)width / (float)length;

  int centerY = topLeftY + round(height / 2);

  int lastXRendered = -1;

  // When we cannot render, we just average the previous values
  float averaged = 0;
  int averagedLength = 0;

  // Now draw the wave...
  for (int i = 0; i < length; i++) {
    float amplitudeNormalized = samples[i] < 0
      ? fabs(samples[i]) / fabs(min)
      : samples[i] / max;

    // Figure out x position of the line
    int x = topLeftX + round(xJump * (float)i);

    // Do not rerender a line twice!
    if (x != lastXRendered) {
      // Figure out y height of bar
      float amplitudeToDisplay = fabs(
        (averagedLength > 0)
        ? (averaged + amplitudeNormalized) / (float)averagedLength
        : amplitudeNormalized
      );

      float barHeight = fmax(1.0, amplitudeToDisplay * (float)height);
      int pixelDistFromCenter = ceil(barHeight / 2);

      // Draw the bar
      int yStart = centerY - pixelDistFromCenter;
      int yEnd = centerY + pixelDistFromCenter;

      for (int y = yStart; y < yEnd; y++) {
        pixels[(y * width) + x] = foregroundColor;
      }

      lastXRendered = x;
      averaged = 0;
      averagedLength = 0;
    } else {
      averaged += fabs(amplitudeNormalized);
      averagedLength++;
    }
  }
}

/**
 * Render a vertical line.
 */
void renderVerticalLine(
    unsigned int *pixels,
    int x,
    int lineWidth,
    int width,
    int height,
    unsigned int foregroundColor
) {
  int xStart = lineWidth > 1 ? x - ceil(lineWidth / 2.0f) : x;
  int xEnd = lineWidth > 1 ? x - floor(lineWidth / 2.0f) : x;

  for (int i = xStart; i < xEnd; i++) {
    if (i >= 0 && i < width) {
      for (int y = 0; y < height; y++) {
        pixels[(y * width) + i] = foregroundColor;
      }
    }
  }
}

/**
 * Render a vertical line.
 */
void renderVerticalTicks(
    unsigned int *pixels,
    float xStart,
    float xEnd,
    float xGap,
    int tickWidth,
    int tickHeight,
    int width,
    int height,
    unsigned int foregroundColor
) {
  int x = 0, xs = 0, xe = 0, i = 0, y = 0;

  for (float xf = xStart; xf < xEnd; xf+= xGap) {
    x = round(xf);

    xs = tickWidth > 1 ? x - ceil(tickWidth / 2.0f) : x;
    xe = tickWidth > 1 ? x - floor(tickWidth / 2.0f) : x;

    for (i = xs; i < xe; i++) {
      if (i >= 0 && i < width) {
        for (y = height; y > height - tickHeight; y--) {
          if (y >= 0 && y < height) {
            pixels[(y * width) + i] = foregroundColor;
          }
        }
      }
    }
  }
}

/**
 * Create a generic slot in memory for pixels.
 */
unsigned int* mallocPixelBuffer(int width, int height) {
  return malloc((width * height) * sizeof(unsigned int));
}

/**
 * Create a generic slot in memory for floats, used to pass samples to renderWaveForm().
 */
float* mallocFloatBuffer(int size) {
  return malloc(size * sizeof(float));
}

/**
 * Free a spot in memory initialized by mallocFloatBuffer
 */
void freeFloatBuffer(float *toFree) {
  free(toFree);
}

/**
 * Free the pixel buffer, usually after rendering it to the canvas.
 */
void freePixelBuffer(unsigned int *toFree) {
  free(toFree);
}
