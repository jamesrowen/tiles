// globals
var lastTime = 0;
var tileColors;
var shapeSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const time = millis() / 1000.0;
  const elapsed = pause ? 0 : time - lastTime;
  lastTime = time;
  tileColors = [color(color1a), color(color2a)];
  shapeSize = tileSize - tilePadding * 2;
  resetMatrix();
  background(bgColor);

  if (mode == 'spin') {
    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        const tilePct = (x + y * gridX) / (gridX - 1) / (gridY - 1);
        translate(tileSize * x + tileSize / 2, tileSize * y + tileSize / 2);
        rotate(tilePct * time);
        translate(-shapeSize / 2, -shapeSize / 2);
        drawTile();
        resetMatrix();
      }
    }
  }

  if (mode == 'orbit') {
    el('message').textContent = "orbit: " + (orbit * 10).toFixed(1);
    updateSetting('orbit', orbit + elapsed / speed * (rewind ? -1 : 1));
    translate(camX, camY);

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        const tilePct = (x + y * gridX) / (gridX - 1) / (gridY - 1);
        translate(tileSize * x + tilePadding, tileSize * y + tilePadding);
        rotate(tilePct * orbit);
        drawTile();
        translate(-(tileSize * x + tilePadding), -(tileSize * y + tilePadding));
      }
    }
  }
}

function drawTile() {
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
