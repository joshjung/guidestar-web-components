#define HEIGHT 400
#define WIDTH 800
#include <emscripten.h>
#include <stdio.h>
#include <math.h>
#include "float.h"

unsigned int* pixelData = NULL;

unsigned int red = 0xFFCCCCCC;

// see: https://gist.github.com/aknuds1/533f7b228aa46e9ee4c8

unsigned int* EMSCRIPTEN_KEEPALIVE renderWave(int width, int height, float* points, int length) {
  if (pixelData != NULL) {
    free(pixelData);
  }

  printf("starting...\n");

  pixelData = malloc((width * height) * sizeof(int));

  float min = FLT_MAX;
  float max = FLT_MIN;

  for (int i = 0; i < length; i++) {
    min = fmin(min, points[i]);
    max = fmax(max, points[i]);
  }

  float range = max - min;

  // Fill with background color
  for (int y = 0; y < height; y++) {
    int yw = y * width;
      for (int x = 0; x < width; x++) {
        pixelData[yw + x] = red;
    }
  }

  float xJump = (float)width / (float)length;

  int centerY = height / 2;

  printf("xJump: %f. centerY: %f\n", xJump, (float)centerY);

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
      float amplitudeToDisplay = averagedLength > 0
        ? (averaged + amplitudeNormalized) / (float)averagedLength
        : amplitudeNormalized;

      int barHeight = round(amplitudeToDisplay * (float)height);

      // Draw the bar
      int yStart = centerY - (barHeight / 2);
      int yEnd = centerY + (barHeight / 2);

      for (int y = yStart; y < yEnd; y++) {
        pixelData[(y * width) + x] = 0xFFEE1111;
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

float* mallocFloatBuffer(int size) {
  return malloc(size * 4);
}

void freeFloatBuffer(float *toFree) {
  free(toFree);
}
