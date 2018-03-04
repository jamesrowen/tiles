// globals
var lastTime = 0, tileColors, shapeSize, step = 0, patternList = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(0, windowWidth, -windowHeight, 0, -100, 100);
  el('defaultCanvas0').addEventListener('click', e => {
    el('mode').classList.toggle('closed');
  });
  noStroke();
  tileColors = [color('red'), color('white')];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ortho(0, windowWidth, -windowHeight, 0, -100, 100);
}

function draw() {
  const time = millis() / 1000.0;
  let tick = playing ? time - lastTime : (step != 0 ? (time - lastTime) * step : 0);
  tick *=  rewind ? -1 : 1;
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
      updateSetting('spin', spin + tick * spinSpeed / 99 * 6);
      if (spinYSpeed != 0)
        updateSetting('spinY', spinY + tick * spinYSpeed / 99 * 6);
      if (spinXSpeed != 0)
        updateSetting('spinX', spinX + tick * spinXSpeed / 99 * 6);
    }

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        updateColors(x, y, nx, ny, tilePct);
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
    const nx = parseInt(windowWidth / tileSize);
    const ny = parseInt(windowHeight / tileSize);
    // expand to fill space if possible
    let newSize = tileSize + parseInt((windowWidth % tileSize) / nx);
    shapeSize = parseInt(newSize * tileScale);

    updateTransitions(tick);

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const tilePct = (x + y * nx) / (nx - 1) / (ny - 1);
        updateColors(x, y, nx, ny, tilePct);
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

        translate(newSize * (x + .5), newSize * (y + .5));
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
      updateSetting('orbit', orbit + tick * Math.pow(orbitSpeed / 100, 2));
    let rows = Math.ceil(bodies / curl);
    translate(camX, camY);

    for (let b = 0; b < bodies; b++) {
      updateColors(b % curl, Math.floor(b / curl), curl, rows, b / (bodies - 1));
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

function updateColors(x, y, nx, ny, pct) {
  let colors = [[color1a, color1b, c1mode, c1alpha], [color2a, color2b, c2mode, c2alpha]];
  for (let i = 0; i < 2; i++) {
    let amount = 0;
    // each mode sets a different gradient
    switch (colors[i][2]) {
      case 1: amount = x / (nx - 1);
              break;
      case 2: amount = y / (ny - 1);
              break;
      case 3: amount = pct;
              break;
      case 4: amount = (x + y) % 2;
              break;
    }
    tileColors[i] = lerpColor(color(colors[i][0]), color(colors[i][1]), amount);
    tileColors[i].setAlpha(colors[i][3]);
  }
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
  // loop over a copy because we may modify the list
  let transitions = curTransitions.slice();
  for (let t of transitions) {
    t[2] += tick * (patternSpeed + 2) / 200;
    // check if complete
    if (t[2] > 1 || t[2] < 0) {
      // set base pattern only when moving in the positive direction
      if (t[2] > 1)
        updateSetting('curPattern', t[0]);
      if (loopTrans) {
        // pass any overtime to the next to stay in sync
        addTransition(t[1], t[2]);
      }
    }
  }
  curTransitions = curTransitions.filter(t => t[2] >= 0 && t[2] <= 1);
  window.localStorage.setItem('curTransitions', JSON.stringify(curTransitions));
}

function mod(x, n) {
    return ((x % n) + n) % n;
};

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}
