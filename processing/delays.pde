float getDelay(int style, int x, int y) {
  float result = 0;
  float nx = (float)(xLen - 1);
  float ny = (float)(yLen - 1);
  
  switch (style) {
    /* diagonal rtl */   case 1: result = (nx - x + ny - y) / (float)(xLen + yLen - 2);
                                 break;
    /* diagonal skew */  case 2: result = (x / nx * ny + y) / (ny * 2);
                                 break;
    /* cascade up */     case 3: result = 1 - (x + y * xLen) / (float)(xLen * yLen - 1);
                                 break;
    /* rtl */            case 4: result = 1 - x / nx;
                                 break;
    /* center-circle */  case 5: result = (pow(x - nx / 2, 2) + pow(y - ny / 2, 2)) / (pow(nx/2, 2) + pow(ny/2, 2));
                                 break;
    /* ltr */            case 6: result = x / nx;
                                 break;
    /* cascade down */   default: result = (x + y * xLen) / (float)(xLen * yLen - 1);
  }
  return result;
}