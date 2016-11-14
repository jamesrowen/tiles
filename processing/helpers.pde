
void createTile() {
  float iterations = 10;
  int shapeSize = tileSize - tilePadding * 2;
  shape1 = createShape();
  shape1.beginShape();
  shape1.fill(color(0, 0, 0));
  shape1.noStroke();
  shape1.vertex(0, 0);
  for (int i = 0; i <= iterations; i++) {
    shape1.vertex(i / iterations * shapeSize, (cos(i /iterations * PI) + 1) / 2 * shapeSize);
  }
  shape1.endShape(CLOSE);
  
  shape2 = createShape();
  shape2.beginShape();
  shape2.fill(color(0, 0, 0));
  shape2.noStroke();
  shape2.vertex(shapeSize, shapeSize);
  for (int i = 0; i <= iterations; i++) {
    shape2.vertex(i /iterations * shapeSize, (cos(i / iterations * PI) + 1) / 2 * shapeSize);
  }
  shape2.endShape(CLOSE);
}

void drawTile(int x, int y, float rotation, String text) {
  int dx = x * tileSize + tileSize / 2;
  int dy = y * tileSize + tileSize / 2;
  int shapeSize = tileSize - tilePadding * 2;
  translate(dx, dy);
  if (rotZ)
    rotate(rotation * (mode == 0 ? spinSpeed : 1));
  if (rotX)
    rotateX(rotation * XYrotScale * (mode == 0 ? spinXSpeed : 1));
  if (rotY)
    rotateY(rotation * XYrotScale * (mode == 0 ? spinYSpeed : 1));
  translate(-shapeSize / 2, -shapeSize / 2);
  
  shape(shape1);
  shape(shape2);
  
  translate(shapeSize / 2, shapeSize / 2);
  if (rotY)
    rotateY(-rotation * XYrotScale * (mode == 0 ? spinYSpeed : 1));
  if (rotX)
    rotateX(-rotation * XYrotScale * (mode == 0 ? spinXSpeed : 1));
  if (rotZ)
    rotate(-rotation * (mode == 0 ? spinSpeed : 1));
  
  fill(color(255, 0 , 0));
  if (text != "")
    text(text, -15, -3 + 12 * (x % 2));
  translate(-dx, -dy);
}

int getQuadrant(int x, int y) {
  return x >= 0 ? (y >= 0 ? 1 : 4) : (y >= 0 ? 2 : 3);
}