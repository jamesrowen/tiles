<<<<<<< HEAD
// settings
var tileColors;
var tileSize = 10;
var tilePadding = 0;
var curveIterations = 10;
var gridSize = {x: 30, y: 30};
var speed = 40;
var rewind = 1;
var pause = false;
var camX = 0;
var camY = 0;

// internal globals
var lastTime = 0;
var orbitPos = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileColors = [color(0, 0, 0, 160), color(255, 255, 255, 160)];
  noStroke();
=======
// global settings
var tileColors;
var tileSize = 48;
var tilePadding = 0;
var curveIterations = 10;
var gridSize = {x: 24, y: 15};

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileColors = [color(0, 0, 0), color(255, 255, 255)];
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
<<<<<<< HEAD
  const time = millis() / 1000.0;
  document.getElementById('message').textContent = "orbit: " + parseInt((orbitPos - 1) * 10);
  const elapsed = pause ? 0 : time - lastTime;
  lastTime = time;
  orbitPos += elapsed / speed * rewind;
  resetMatrix();
  background('#f0f0f0');

  translate(camX, camY);
  for (let y = 0; y < gridSize.y; y++) {
    for (let x = 0; x < gridSize.x; x++) {
      const tilePct = (x + y * gridSize.x) / (gridSize.x - 1) / (gridSize.y - 1);
      // tileColors[0] = color(255 - 105 * x / gridSize.x, 255, 255 - 105 * y / gridSize.y, 200);
      // tileColors[1] = color(205 * x / gridSize.x + 50, 205 * y / gridSize.y + 50, 255, 200);
      translate(tileSize * x + tilePadding, tileSize * y + tilePadding);
      rotate(orbitPos * tilePct);
      drawTile();
      rotate(-tilePct);
=======
  resetMatrix();
  background('#eee');
  translate(30, 30);
  for (let y = 0; y < gridSize.y; y++) {
    for (let x = 0; x < gridSize.x; x++) {
      const gridfactor = (x + y) / 4;
      translate(tileSize * x + tilePadding, tileSize * y + tilePadding);
      drawTile();
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
      translate(-(tileSize * x + tilePadding), -(tileSize * y + tilePadding));
    }
  }
}

<<<<<<< HEAD
function drawTile() {
  const shapeSize = tileSize - tilePadding * 2;
=======
function drawTile(x, y) {
  const shapeSize = tileSize - tilePadding * 2;
  noStroke();
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
  // draw two halves, first upper left then bottom right
  for (let i = 0; i < 2; i++) {
    fill(tileColors[i]);
    beginShape();
    vertex(shapeSize * i, shapeSize * i);
    for (let j = 0; j <= curveIterations; j++) {
      vertex(j / curveIterations * shapeSize,
        (cos(j / curveIterations * PI) + 1) / 2 * shapeSize);
    }
    endShape(CLOSE);
  }
}
