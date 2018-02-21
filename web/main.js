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
  resetMatrix();
  background(bgColor);

  if (mode == 'spin') {
    shapeSize = parseInt(tileSize * tileScale);
    const nx = parseInt(windowWidth / tileSize);
    const ny = parseInt(windowHeight / tileSize);
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        translate(tileSize * (x + .5), tileSize * (y + .5));
        rotate(tilePct * time);
        translate(-shapeSize / 2, -shapeSize / 2);
        drawTile();
        resetMatrix();
      }
    }
  }

  if (mode == 'orbit') {
    shapeSize = zoom;
    el('message').textContent = "orbit: " + (orbit * 10).toFixed(1);
    updateSetting('orbit', orbit + elapsed / speed * (rewind ? -1 : 1));
    translate(camX, camY);

    for (let b = 0; b < bodies; b++) {
      for (let c = 0; c < curl; c++) {
        translate(zoom * c, zoom * b);
        rotate((c + b * curl) / (curl - 1) / (bodies - 1) * orbit);
        drawTile();
        translate(-zoom * c, -zoom * b);
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
