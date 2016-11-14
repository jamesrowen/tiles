var xLen = 24;
var yLen = 12;
var tileSize = 48;
var tilePadding = 8;
var colors = ['#ff0000', '#00ff00', '#0000ff'];
var classes = ['red', 'blue', 'green'];

document.body.style.fontSize = 0;

for (n = 0; n < 1; n++) {
  for (y = 0; y < yLen; y++) {
    for (x = 0; x < xLen; x++) {
      var div = document.createElement('div');
      div.className = classes[n] + " tile x" + x + " y" + y;
      div.style.width = tileSize + "px";
      div.style.height = tileSize + "px";
      div.style.left = (x * tileSize + tilePadding) + "px";
      div.style.top = (y * tileSize + tilePadding) + "px";
      div.style.backgroundColor = colors[n];
      document.body.appendChild(div);
    }
    document.body.appendChild(document.createElement('br'));
  }
}
