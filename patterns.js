var patterns = {
  'sine':
    (x, y) => 0,
  'icebergs':
    (x, y) => (x + (y % 2)) % 2,
  'ribbons':
    (x, y) => ((x + (y % 2)) % 2) * 2 + 1,
  'v-zags':
    (x, y) => (y % 2) + (x % 2 == 0 ? 3 : 1),
  'h-zags':
    (x, y) => (y % 2) * 2 + (x % 2 == 0 ? 0 : 1),
  'x':
    (x, y, nx, ny) => ((x + (y % 2)) % 2) * 2 + getQuadrant(x - nx / 2, y - ny / 2) + 2,
  'diamonds':
    (x, y) => (x + (y % 2)) % 2 + 2 * (y % 2),
  'concentric asym':
    (x, y, nx, ny) => ((x + (y % 2)) % 2) * 2 + getQuadrant(x - nx / 2, y - ny / 2) + 1,
  'teeth':
    (x, y, nx, ny) => x + y * nx + (y % 2),
  'super teeth':
    (x, y) => x + x % 3 + y + y % 3,
  'v-zags + teeth':
    (x, y) => x + (y % 2) * y + (x % 3),
  'herringbone':
    (x, y) => (x % 2) + (y % 2 == 0 ? 3 : 1)
};

var transitions = {
  'ltr':
    (x, y, nx, ny) => x / nx,
  'rtl':
    (x, y, nx, ny) => 1 - x / nx,
  'cascade down':
    (x, y, nx, ny) => (x + y * (nx + 1)) / ((nx + 1) * ny),
  'cascade up':
    (x, y, nx, ny) => 1 - (x + y * (nx + 1)) / ((nx + 1) * ny),
  'diagonal rtl':
    (x, y, nx, ny) => (nx - x + ny - y) / (nx + ny),
  'diagonal skew':
    (x, y, nx, ny) => (x / nx * ny + y) / (ny * 2),
  'center-circle':
    (x, y, nx, ny) => (Math.pow(x - nx / 2, 2) + Math.pow(y - ny / 2, 2)) / (Math.pow(nx/2, 2) + Math.pow(ny/2, 2))
};

function getQuadrant(x, y) {
  return x >= 0 ? (y >= 0 ? 1 : 4) : (y >= 0 ? 2 : 3);
}
