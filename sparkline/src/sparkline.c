#include <stdio.h>
#include <emscripten/emscripten.h>

int main() {
  printf("Loading sparkline instance.\n");
  return 0;
}

EMSCRIPTEN_KEEPALIVE
void console_log(char *blah) {
  printf("%s", blah);
}
