// globals
var lastTime = 0;
var tileColors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const time = millis() / 1000.0;
  el('message').textContent = "orbit: " + parseInt((orbit - 1) * 10);
  const elapsed = pause ? 0 : time - lastTime;
  lastTime = time;
  updateSetting('orbit', orbit + elapsed / speed * (rewind ? -1 : 1));
  tileColors = [color(color1a), color(color2a)];
  resetMatrix();
  background(bgColor);

  translate(camX, camY);
  for (let y = 0; y < gridY; y++) {
    for (let x = 0; x < gridX; x++) {
      const tilePct = (x + y * gridX) / (gridX - 1) / (gridY - 1);
      // tileColors[0] = color(255 - 105 * x / gridX, 255, 255 - 105 * y / gridY, 200);
      // tileColors[1] = color(205 * x / gridX + 50, 205 * y / gridY + 50, 255, 200);
      // tileColors[0] = color(55 * x / gridX, 55 * x / gridX, 55 * x / gridX, 200);
      // tileColors[1] = color(35 * x / gridX + 220, 35 * x / gridX + 220, 35 * x / gridX + 220, 200);
      translate(tileSize * x + tilePadding, tileSize * y + tilePadding);
      rotate(orbit * tilePct);
      drawTile();
      rotate(-tilePct);
      translate(-(tileSize * x + tilePadding), -(tileSize * y + tilePadding));
    }
  }
}

function drawTile() {
  const shapeSize = tileSize - tilePadding * 2;
  // draw two halves, first upper left then bottom right
  for (let i = 0; i < 2; i++) {
    fill(tileColors[i]);
    beginShape();
    vertex(shapeSize * i, shapeSize * i);
    for (let j = 0; j <= shapeIterations; j++) {
      vertex(j / shapeIterations * shapeSize,
        (cos(j / shapeIterations * PI) + 1) / 2 * shapeSize);
    }
    endShape(CLOSE);
  }
}
