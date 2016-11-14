import com.hamoid.*;

// globals
VideoExport videoExport;
PShape shape1, shape2;
boolean playTransitions = false;
float transitionProg = 1;
int numPatterns = 7;
int oldPattern = 0, curPattern = 0;
float lastTime = 0;
int iterationCount = -1;

// grid
int tileSize = 44;
int tilePadding = 0;
int bgMargin = 45;
int xLen = 28;
int yLen = 14;

// settings
int mode = 1;
boolean recordVideo = false;
boolean staggerTiles = false;
boolean shortRotations = false;
boolean useColor = false;
boolean fullscreen = true;
boolean rotX = false;
boolean rotY = false;
boolean rotZ = true;

// mode 0 - staggered infinite spin
float spinSpeed = 1;
float spinXSpeed = 1;
float spinYSpeed = 1;
float bgSpeed = .08;
int bgColorRange = 215;
int bgColorOffset = 40;

// mode 1 - transition between patterns
float transitionSpeed = .11;
float animationLength = .55;
float opacity = .4;
float bgColor = 130;
int XYrotScale = 2;

// colors
int color1Base = 40;
int color1Range = 40;
int color2Base = 215;
int color2Range = 30;

void setup() {
  size(100, 100, P3D);
  surface.setResizable(true);
  surface.setSize(bgMargin * 2 + tileSize * xLen, bgMargin * 2 + tileSize * yLen);
  //fullScreen(P3D);
  //xLen = (width - bgMargin * 2) / tileSize;
  //yLen = (height - bgMargin * 2) / tileSize;
    
  smooth(8);
  noStroke();
  createTile();

  if (recordVideo) {
    videoExport = new VideoExport(this, "crazy-tiles-2.mp4");
    videoExport.setFrameRate(60);
  }
}

void draw() {
  float time = millis() / 1000.0;
  float elapsed = time - lastTime;
  lastTime = time;

  background(bgColor); // 50
  if (mode == 0)
    background((sin(time * bgSpeed) + 1) / 2 * bgColorRange + bgColorOffset);
  translate(bgMargin, bgMargin, 0);

  if (playTransitions) {
    if (transitionProg < 1) {
      transitionProg = min(transitionProg + elapsed * transitionSpeed, 1);
    } else {
      nextTransition();
    }
  }


  for (int pass = 0; pass < 2; pass++) {
    if (!staggerTiles && pass > 0)
      continue;

    for (int y = 0; y < yLen; y++) {
      for (int x = 0; x < xLen; x++) {
        if (staggerTiles && (x + y * xLen + (y % 2)) % 2 == pass)
          continue;

        float indexAsPercent = (x + y * xLen)/(float)(xLen * yLen);
        int alpha = (int)((mode == 1 ? (opacity * (cos(time * .08) + 1) / 2) : .9) * (cos(time * .08) + 1) / 2 * 255) + 114;
        if (useColor) {
          colorMode(HSB);
          shape1.setFill(color((indexAsPercent * 15 + 130 + millis()/600.0) % 256, 255, 255, 50));
          shape2.setFill(color((indexAsPercent * 15 + 100 + millis()/600.0) % 256, 255, 255, alpha));
          colorMode(RGB);
        }
        else {
          float g = color1Base + (1 - indexAsPercent) * color1Range;
          shape1.setFill(color(g, g, g, alpha));
          g = color2Base + indexAsPercent * color2Range;
          shape2.setFill(color(g, g, g, alpha));
        }

        if (mode == 0) {
          drawTile(x, y, time * indexAsPercent, "");
        } else {
          int oldCell = getCell(oldPattern, x, y);
          int newCell = getCell(curPattern, x, y);
          float delay = getDelay(curPattern, x, y);

          float animProg = min(max(transitionProg - delay * (1 - animationLength), 0) / animationLength, 1);
          if (shortRotations) {
            // if tile would rotate 270, make it 90 the other direction
            if (newCell == 0 && oldCell == 3)
              newCell = 4;
            if (newCell == 3 && oldCell == 0)
              oldCell = 4;
          } else {
            // make all rotations same direction
            if (newCell < oldCell)
              newCell += 4;
          }
          drawTile(x, y, PI/2 * lerp(oldCell, newCell, animProg), "");// + getCell(curPattern, x, y));
        }
      }
    }
  }

  if (recordVideo) {
    videoExport.saveFrame();
  }
}

void keyPressed() {
  if (key == 's') {
    save("tiles-" + hour() + minute() + second() + ".png");
    println("saved");
  }

  if (key == 'p')
    playTransitions = !playTransitions;

  if (key == 'n')
    nextTransition();

  if (key == 'c')
    useColor = !useColor;

  if (key == 'x')
    rotX = !rotX;

  if (key == 'y')
    rotY = !rotY;

  if (key == 'z')
    rotZ = !rotZ;
}

void nextTransition() {
  transitionProg = 0;
  if (curPattern == 0) {
    iterationCount++;
    rotZ = (iterationCount % 7 + 1) % 2 == 1;
    rotY = ((iterationCount % 7 + 1) / 2) % 2 == 1;
    rotX = ((iterationCount % 7 + 1) / 4) % 2 == 1;
  }
  oldPattern = curPattern;
  curPattern = (curPattern + 1) % numPatterns;
}