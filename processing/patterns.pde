int getCell(int pattern, int x, int y) {
  int result = 0;
  switch (pattern) {
    /* default */       case 0: result = 0;
                                 break;
    /* icebergs */       case 1: result = (x + (y % 2)) % 2;
                                 break;
    /* ribbon down */    case 2: result = ((x + (y % 2)) % 2) * 2 + 1;
                                 break;
    /* v-zags */         case 3: result = (y % 2) + (x % 2 == 0 ? 3 : 1);
                                 break;
    /* h-zags */         case 4: result = (y % 2) * 2 + (x % 2 == 0 ? 0 : 1);
                                 break;
    /* x */              case 5: result = ((x + (y % 2)) % 2) * 2 + getQuadrant(x - xLen / 2, y - yLen / 2) + 2;
                                 break;
    /* diamonds */       case 6: result = (x + (y % 2)) % 2 + 2 * (y % 2);
                                 break;
    ///* asym circles */   case 6: result = ((x + (y % 2)) % 2) * 2 + getQuadrant(x - xLen / 2, y - yLen / 2) + 1;
    //                             break;
    ///* asym diamonds */  case 6: result = x + x % 3 + y + y % 3;
    //                             break;
    ///* v-zags + teeth */ case 1: result = x + (y % 2) * y + (x % 3);
                                 //break;
    ///* teeth */          case 5: result = (x + y * xLen + (y % 2));
    //                             break;
    ///* herringbone */    case 5: result = (x % 2) + (y % 2 == 0 ? 3 : 1);
    //                             break;
  }
  while (result < 0)
    result += 4;
  while (result > 3)
    result -= 4;
  return result;
}


// figure out something to do with patterns with non-integer return values
//int pattern2(int x, int y) {
//  return 2 + cos(x / (float)(xLen - 1) * PI / 2);
//}