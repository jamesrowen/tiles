// keyboard handler
window.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 27: // esc
      toggleControls();
      break;
    case 32: // space
      if (guidePos == 1) {
        nextGuideStep(2500);
      }
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
      if (guidePos == 2) {
        nextGuideStep(3000);
      }
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

      if (orbitHelpPos == 0) {
        updateSetting('orbitHelpPos', 1);
        el('orbitBubble').classList.remove('open');
      }
    }
    e.preventDefault();
  });

  element.addEventListener('click', e => {
    toggleControls();
  });
}


// general actions
function setMode(mode) {
  if (guidePos == 5 && mode == 'pattern')
    nextGuideStep(1500);
  if (mode == 'orbit' && orbitHelpPos == -1) {
    window.setTimeout(() => {
      if (this.mode == 'orbit') {
        updateSetting('orbitHelpPos', 0);
        el('orbitBubble').classList.add('open');
      }
    }, 8000);
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

function useModeSlider(id, value) {
  if (guidePos == 0) {
    nextGuideStep(3000);
  }
  updateSetting(id, value);
}

function toggleControls() {
  if (guidePos == 9) {
    nextGuideStep(4000);
  }
  el('mode').classList.toggle('closed');
}

function clickPreset(name) {
  if (guidePos == 3 || guidePos == 8)
    nextGuideStep(3000);
  loadPreset(name);
}

function clickColorPreset(name) {
  if (guidePos == 4)
    nextGuideStep(4000);
  loadPreset(name);
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
function toggleLoop() {
  if (guidePos == 7)
    nextGuideStep(4000);

  updateSetting('loopTrans', !loopTrans);
}

function addTransition(transition, time) {
  if (guidePos == 6)
    nextGuideStep(2000);

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
