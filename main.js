// globals
var lastTime = 0, tileColors, shapeSize, step = 0;

var curTransitions = [['concentric asym', 'ltr', .75],['sine', 'ltr', .5],['h-zags', 'ltr', .25],['v-zags', 'ltr', 0]];
curPattern = 'diamonds';

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(0, windowWidth, -windowHeight, 0, -100, 100);
  el('defaultCanvas0').addEventListener('click', e => {
    el('mode').classList.toggle('closed');
  });
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ortho(0, windowWidth, -windowHeight, 0, -100, 100);
}

function draw() {
  const time = millis() / 1000.0;
  const tick = playing ? time - lastTime : (step != 0 ? (time - lastTime) * step : 0);
  step = 0;
  lastTime = time;
  resetMatrix();
  background(bgColor);

  if (mode == 'spin') {
    const nx = parseInt((windowWidth - margin * 1.9) / tileSize);
    const ny = parseInt((windowHeight - margin * 1.9) / tileSize);
    // expand to fill space if possible
    let newSize = tileSize + parseInt(((windowWidth - margin * 1.9) % tileSize) / nx);
    shapeSize = parseInt(newSize * tileScale);
    if (tick != 0) {
      updateSetting('spin', spin + tick * spinSpeed / 99 * 6 * (rewind ? -1 : 1));
      if (spinYSpeed != 0)
        updateSetting('spinY', spinY + tick * spinYSpeed / 99 * 6 * (rewind ? -1 : 1));
      if (spinXSpeed != 0)
        updateSetting('spinX', spinX + tick * spinXSpeed / 99 * 6 * (rewind ? -1 : 1));
    }

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        updateColors(x / (nx - 1), y / (ny - 1), tilePct);
        translate(margin + newSize * (x + .5), margin + newSize * (y + .5));
        rotate(tilePct * spin);
        rotateY(tilePct * spinY);
        rotateX(tilePct * spinX);
        translate(-shapeSize / 2, -shapeSize / 2);
        drawTile();
        resetMatrix();
      }
    }
  }

  if (mode == 'pattern') {
    const nx = parseInt((windowWidth - margin * 1.9) / tileSize);
    const ny = parseInt((windowHeight - margin * 1.9) / tileSize);
    // expand to fill space if possible
    let newSize = tileSize + parseInt(((windowWidth - margin * 1.9) % tileSize) / nx);
    shapeSize = parseInt(newSize * tileScale);

    updateTransitions(tick);

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        updateColors(x / (nx - 1), y / (ny - 1), tilePct);
        // calculate tile rotation - start with the current pattern's rotation
        let rotation = mod(patterns[curPattern](x, y, nx, ny), 4);
        // each transition looks at the previous one to calc its rotation contribution
        let prevPosition = rotation;
        for (let t of curTransitions) {
          const delay = transitions[t[1]](x, y, nx, ny);
          const transitionProg = min(max(t[2] - delay * (1 - animationLength), 0) / animationLength, 1);
          const nextPosition = mod(patterns[t[0]](x, y, nx, ny), 4);

          rotation += lerp(0, getRotation(prevPosition, nextPosition), transitionProg);
          prevPosition = nextPosition;
        }

        translate(margin + newSize * (x + .5), margin + newSize * (y + .5));
        rotate(PI / 2 * rotation);
        if (rotY)
          rotateY(PI * rotation);
        if (rotX)
          rotateX(PI * rotation);
        translate(-shapeSize / 2, -shapeSize / 2);
        drawTile();
        resetMatrix();
      }
    }
  }

  if (mode == 'orbit') {
    shapeSize = zoom;
    if (tick != 0)
      updateSetting('orbit', orbit + tick * Math.pow(orbitSpeed / 100, 2) * (rewind ? -1 : 1));
    let rows = Math.ceil(bodies / curl);
    translate(camX, camY);

    for (let b = 0; b < bodies; b++) {
      updateColors((b % curl) / (curl - 1), Math.floor(b / curl) / (rows - 1), b / (bodies - 1));
      translate(zoom * (b % curl) * growth / 100, zoom * Math.floor(b / curl) * growth / 100);
      rotate(b / (bodies - 1) * orbit);
      drawTile();
      translate(-zoom * (b % curl) * growth / 100, -zoom * Math.floor(b / curl) * growth / 100);
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

function mod(x, n) {
    return ((x % n) + n) % n;
};

function chooseRandom(list, exclude) {
  let result = list.filter(i => i != exclude);
  return result[Math.floor(Math.random() * result.length)];
}

function getRotation(current, next) {
  let newNext = next;
  if (shortRotations) {
    // if tile would rotate 270, make it 90 the other direction
    if (current == 3 && next == 0)
      newNext = 4;
    if (current == 0 && next == 3)
      newNext = -1;
  }
  else if (next < current) {
    // make all rotations same direction
    newNext = next + 4;
  }
  return newNext - current;
}

function updateTransitions(tick) {
  for (let t of curTransitions) {
    t[2] += tick * patternSpeed / 99;
    if (t[2] >= 1) {
      curPattern = t[0];
      addTransition(
        chooseRandom(Object.keys(patterns), curTransitions[curTransitions.length - 1][0]),
        curTransition
      );
    }
  }
  curTransitions = curTransitions.filter(t => t[2] < 1);
}
