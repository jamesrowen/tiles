// keyboard handler
window.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 27: // esc
      el('mode').classList.toggle('closed');
      break;
    case 32: // space
      updateSetting('playing', !playing);
      e.preventDefault();
      break;
    case 188: // comma (<)
      setStep(-1);
      break;
    case 190: // period (>)
      setStep(1);
      break;
    case 82: // R
      if (!e.ctrlKey && !e.metaKey)
        updateSetting('rewind', !rewind);
      break;
    case 187: // equal/plus
      mode == 'spin' ? updateSetting('tileSize', min(tileSize + 1, 180)) :
        updateZoom(min(zoom + 1, 120));
      break;
    case 189: // minus
      mode == 'spin' ? updateSetting('tileSize', max(tileSize - 1, 40)) :
        updateZoom(max(zoom - 1, 4));
      break;
  }
});


// mouse handler
function setMouseListeners(element) {
  element.addEventListener('wheel', e => {
    if (mode == 'spin' && playing == false) {
      updateSetting('spinY', spinY - e.deltaX / 500);
      updateSetting('spinX', spinX - e.deltaY / 500);
    }
    if (mode == 'orbit') {
      updateSetting('camX', camX - e.deltaX);
      updateSetting('camY', camY - e.deltaY);
    }
    e.preventDefault();
  });

  element.addEventListener('click', e => {
    el('mode').classList.toggle('closed');
  });
}


// general actions
function setMode(mode) {
  if (!changedMode) {
    updateSetting('changedMode', true);
    elements('#modeTabs div').map(e => e.classList.remove('pulse'));
  }
  updateSetting('mode', mode);
}

function setStep(val) {
  step = val;
}

function resetPos() {
  updateSetting(mode, 0);
  if (mode == 'spin') {
    updateSetting('spinX', 0);
    updateSetting('spinY', 0);
  }
}


// spin mode actions
function clearSpinX() {
  updateSetting('spinX', 0);
  updateSetting('spinXSpeed', 0);
}

function clearSpinY() {
  updateSetting('spinY', 0);
  updateSetting('spinYSpeed', 0);
}


// pattern mode actions
function addTransition(transition, time) {
  if (patternList.length == 0) {
    patternList = shuffle(Object.keys(patterns));
  }
  let newPattern = patternList.pop();

  // by default start at the beginning or end (ok if time == 0)
  if (!time)
    time = rewind ? 1 : 0;
  // wrap around if coming from a previous transition
  if (time < 0)
    time += 1;
  if (time > 1)
    time -= 1;

  if (rewind) {
    let lastPattern = curPattern;
    updateSetting('curPattern', newPattern);
    newPattern = lastPattern;
    curTransitions.unshift([newPattern, transition, time]);
  } else {
    curTransitions.push([newPattern, transition, time]);
  }
}


// orbit mode actions
function updateZoom(val) {
  updateSetting('camX', camX + (camX - width / 2) / zoom * (val - zoom));
  updateSetting('camY', camY + (camY - height / 2) / zoom * (val - zoom));
  updateSetting('zoom', val);
}

function resetCamPos() {
  updateSetting('camX', 0);
  updateSetting('camY', 0);
}
