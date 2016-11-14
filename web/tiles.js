var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var startTime = new Date();

var tileSize = 48;
var tilePadding = 1;
var shapeSize = tileSize - tilePadding * 2;
var xLen = 24;
var yLen = 12;
var bgMargin = 25;

var iterations = 10;
var colors = ['rgba(60, 60, 60, .4)', 'rgb(200, 200, 200)'];

window.requestAnimationFrame(draw);

function draw() {
  var time = ((new Date()).getTime() - startTime.getTime()) / 1000;
  ctx.fillStyle = 'rgb(130, 130, 130)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (y = 0; y < yLen; y++) {
    for (x = 0; x < xLen; x++) {
      drawTile(x, y, (x + y * xLen) / (xLen * yLen - 1) * Math.PI + time, time);
      // drawTile(x, y, 0, time);
    }
  }
  window.requestAnimationFrame(draw);
}

function drawTile(x, y, theta, time) {
  ctx.translate(bgMargin + x * tileSize + tileSize / 2, bgMargin + y * tileSize + tileSize / 2);
  ctx.rotate(theta);
  // if (x == 0 && y == 0) console.log(theta);
  ctx.translate(-shapeSize / 2, -shapeSize / 2);

  for (j = 0; j < 2; j++) {
    ctx.fillStyle = colors[j];
    ctx.beginPath();
    for (i = 0; i <= iterations; i++) {
      ctx.lineTo(i / iterations * shapeSize, (Math.cos(i / iterations * Math.PI) + 1) / 2 * shapeSize);
    }
    ctx.lineTo(shapeSize * j, shapeSize * j);
    ctx.closePath();
    ctx.fill();
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
