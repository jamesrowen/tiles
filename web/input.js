window.addEventListener('keydown', e => {
  console.log(e.key, e.keyCode);
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
        updateSetting('zoom', min(zoom + 1, 80));
      break;
    case 189: // minus
      mode == 'spin' ? updateSetting('tileSize', max(tileSize - 1, 40)) :
        updateSetting('zoom', max(zoom - 1, 5));
      break;
  }
});

window.addEventListener('wheel', e => {
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

function clearSpinX() {
  updateSetting('spinX', 0);
  updateSetting('spinXSpeed', 0);
}
function clearSpinY() {
  updateSetting('spinY', 0);
  updateSetting('spinYSpeed', 0);
}
