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
