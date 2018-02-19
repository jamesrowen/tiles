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
    case 'curveIterations':
      curveIterations = val;
      break;
  }
}
