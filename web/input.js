function changeSetting(setting, value) {
  switch(setting) {
    case 'tileSize':
      tileSize = value;
      break;
    case 'tilePadding':
      tilePadding = value;
      break;
    case 'gridX':
      gridSize.x = value;
      break;
    case 'gridY':
      gridSize.y = value;
      break;
  }
}
