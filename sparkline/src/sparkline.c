#include <emscripten.h>
#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include "float.h"

unsigned int* pixelData = NULL;

void freeRenderMemory() {
  if (pixelData != NULL) {
    free(pixelData);
    pixelData = NULL;
  }
}

// see: https://gist.github.com/aknuds1/533f7b228aa46e9ee4c8
unsigned int* EMSCRIPTEN_KEEPALIVE renderWave(
    int width,
    int height,
    float* points,
    int length,
    unsigned int backgroundColor,
    unsigned int foregroundColor,
    bool fillBackground
) {
  freeRenderMemory();

  pixelData = malloc((width * height) * sizeof(int));

  float min = FLT_MAX;
  float max = FLT_MIN;

  for (int i = 0; i < length; i++) {
    min = fmin(min, points[i]);
    max = fmax(max, points[i]);
  }

  float range = max - min;

  if (fillBackground) {
    // Fill with background color
    for (int y = 0; y < height; y++) {
      int yw = y * width;
        for (int x = 0; x < width; x++) {
          pixelData[yw + x] = backgroundColor;
      }
    }
  }

  float xJump = (float)width / (float)length;

  int centerY = round(height / 2);

  int lastXRendered = -1;

  // When we cannot render, we just average the previous values
  float averaged = 0;
  int averagedLength = 0;

  // Now draw the wave...
  for (int i = 0; i < length; i++) {
    float amplitudeNormalized = points[i] < 0 // fabs(points[i]) / (range / 2); // From 0.0 - 1.0
      ? fabs(points[i]) / fabs(min)
      : points[i] / max;

    // Figure out x position of the line
    int x = round(xJump * (float)i);

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
        pixelData[(y * width) + x] = foregroundColor;
      }

      lastXRendered = x;
      averaged = 0;
      averagedLength = 0;
    } else {
      averaged += fabs(amplitudeNormalized);
      averagedLength++;
    }
  }

  return &pixelData[0];
}

/**
 * Create a generic slot in memory for floats.
 */
float* mallocFloatBuffer(int size) {
  return malloc(size * 4);
}

/**
 * Free a spot in memory initialized by mallocFloatBuffer
 */
void freeFloatBuffer(float *toFree) {
  free(toFree);
}
