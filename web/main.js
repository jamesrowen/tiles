// globals
var lastTime = 0;
var tileColors = [];
var shapeSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  el('defaultCanvas0').addEventListener('click', e => {
    el('controls').classList.toggle('closed');
  });
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const time = millis() / 1000.0;
  const elapsed = pause ? 0 : time - lastTime;
  lastTime = time;
  resetMatrix();
  background(bgColor);

  if (mode == 'spin') {
    const nx = parseInt((windowWidth - margin * 1.8) / tileSize);
    const ny = parseInt((windowHeight - margin * 1.8) / tileSize);
    let newSize = tileSize + parseInt(((windowWidth - margin * 1.8) % tileSize) / nx);
    shapeSize = parseInt(newSize * tileScale);

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        updateColors(x / (nx - 1), y / (ny - 1), tilePct);
        translate(margin + newSize * (x + .5), margin + newSize * (y + .5));
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
      for (let r = 0; r < radius; r++) {
        const tilePct = (r + b * radius) / (radius - 1) / (bodies - 1);
        updateColors(r / (radius - 1), b / (bodies - 1), tilePct);
        translate(zoom * r, zoom * b);
        rotate(tilePct * orbit);
        drawTile();
        translate(-zoom * r, -zoom * b);
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

function updateColors(xpct, ypct, pct) {
  tileColors = [lerpColor(color(color1a), color(color1b), g1x ? (g1y ? pct : xpct) : (g1y ? ypct : 0)),
    lerpColor(color(color2a), color(color2b), g2x ? (g2y ? pct : xpct) : (g2y ? ypct : 0))];
  tileColors[0].setAlpha(c1alpha);
  tileColors[1].setAlpha(c2alpha);
}
