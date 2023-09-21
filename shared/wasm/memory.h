#include <malloc.h>

/**
 * Create a generic slot in memory for pixels.
 */
unsigned int* mallocPixelBuffer(int width, int height);

/**
 * Create a generic slot in memory for floats, used to pass samples to renderWaveForm().
 */
float* mallocFloatBuffer(int size);

/**
 * Free a spot in memory initialized by mallocFloatBuffer
 */
void freeFloatBuffer(float *toFree);

/**
 * Free the pixel buffer, usually after rendering it to the canvas.
 */
void freePixelBuffer(unsigned int *toFree);
