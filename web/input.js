function changeSetting(setting, value) {
  const val = parseInt(value);
  switch(setting) {
    case 'tileSize':
      tileSize = val;
      break;
    case 'tilePadding':
      tilePadding = val;
      break;
    case 'gridX':
      gridSize.x = val;
      break;
    case 'gridY':
      gridSize.y = val;
      break;
<<<<<<< HEAD
    case 'speed':
      speed = val;
      break;
    case 'rewind':
      rewind = value ? -1 : 1;
      console.log(value);
      break;
    case 'camX':
      camX = val;
      break;
    case 'camY':
      camY = val;
=======
    case 'curveIterations':
      curveIterations = val;
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
      break;
  }
}

function keyPressed() {
<<<<<<< HEAD
  console.log(key, keyCode);
  switch(key) {
    case ' ':
      pause = !pause;
      break;
    case 'R':
      rewind *= -1;
      document.getElementById('rewind').checked = !document.getElementById('rewind').checked;
      break;
  }
=======
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
  switch(keyCode) {
    case 27:
      document.getElementById('controls').classList.toggle('closed');
      break;
<<<<<<< HEAD
    case 187:
      tileSize = min(tileSize + 2, 100);
      document.getElementById('tileSize').value = tileSize;
      break;
    case 189:
      tileSize = max(tileSize - 2, 10);
      document.getElementById('tileSize').value = tileSize;
      break;
=======
>>>>>>> 677a1d476f4a06ff97f21fb49e63e34699991994
  }
}
