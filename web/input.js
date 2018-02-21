function keyPressed() {
  console.log(key, keyCode);
  switch(key) {
    case ' ':
      updateSetting('pause', !pause);
      break;
    case 'R':
      if (!keyIsDown(91) && !keyIsDown(93)) {
        updateSetting('rewind', !rewind);
      }
      break;
  }
  switch(keyCode) {
    case 27:
      el('controls').classList.toggle('closed');
      break;
    case 187:
      updateSetting('tileSize', min(tileSize + 2, 100));
      break;
    case 189:
      updateSetting('tileSize', max(tileSize - 2, 5));
      break;
  }
}

window.addEventListener('wheel', e => {
  updateSetting('camX', camX - e.deltaX);
  updateSetting('camY', camY - e.deltaY);
  e.preventDefault();
});
