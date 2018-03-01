var patterns = {
  'default':
    (x, y) => 0,
  'icebergs':
    (x, y) => (x + (y % 2)) % 2,
  'ribbonDown':
    (x, y) => ((x + (y % 2)) % 2) * 2 + 1,
  'vZags':
    (x, y) => (y % 2) + (x % 2 == 0 ? 3 : 1),
  'hZags':
    (x, y) => (y % 2) * 2 + (x % 2 == 0 ? 0 : 1),
  'x':
    (x, y, nx, ny) => ((x + (y % 2)) % 2) * 2 + getQuadrant(x - nx / 2, y - ny / 2) + 2,
  'diamonds':
    (x, y) => (x + (y % 2)) % 2 + 2 * (y % 2),
  'asymConcentric':
    (x, y, nx, ny) => ((x + (y % 2)) % 2) * 2 + getQuadrant(x - nx / 2, y - ny / 2) + 1,
  'vZagsAndTeeth':
    (x, y) => x + (y % 2) * y + (x % 3),
  'teeth':
    (x, y, nx, ny) => x + y * nx + (y % 2),
  'superTeeth':
    (x, y) => x + x % 3 + y + y % 3,
  'herringbone':
    (x, y) => (x % 2) + (y % 2 == 0 ? 3 : 1)
};

function getQuadrant(x, y) {
  return x >= 0 ? (y >= 0 ? 1 : 4) : (y >= 0 ? 2 : 3);
}
