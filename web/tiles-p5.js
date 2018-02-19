// global settings
var tileColors;
var tileSize = 48;
var tilePadding = 0;
var curveIterations = 15;
var gridSize = {x: 24, y: 15};

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileColors = [color(0, 0, 0), color(255, 255, 255)];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  resetMatrix();
  background('#eee');
  translate(30, 30);
  for (let y = 0; y < gridSize.y; y++) {
    for (let x = 0; x < gridSize.x; x++) {
      const gridfactor = (x + y) / 4;
      translate(tileSize * x, tileSize * y);
      drawTile();
      translate(-tileSize * x, -tileSize * y);
    }
  }
}

function drawTile(x, y) {
  noStroke();
  // draw two halves, first upper left then bottom right
  for (let i = 0; i < 2; i++) {
    fill(tileColors[i]);
    beginShape();
    vertex(tileSize * i + tilePadding * Math.pow(-1, i), tileSize * i + tilePadding * Math.pow(-1, i));
    for (let j = 0; j <= curveIterations; j++) {
      vertex(j / curveIterations * (tileSize - tilePadding * 2),
        (cos(j / curveIterations * PI) + 1) / 2 * (tileSize - tilePadding * 2));
    }
    endShape(CLOSE);
  }
}
