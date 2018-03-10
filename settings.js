var el = document.getElementById.bind(document);

var settings = {
  'mode': {default: 'spin', parse: x => x},
  // playback
  'playing': {default: true, parse: parseBool},
  'rewind': {default: false, parse: parseBool},
  'spinSpeed': {default: 40, parse: parseInt, type: 'slider', tween: true},
  'patternSpeed': {default: 40, parse: parseInt, type: 'slider', tween: true},
  'orbitSpeed': {default: 40, parse: parseInt, type: 'slider', tween: true},
  // colors
  'color1a': {default: '#000000', parse: x => x, tween: true},
  'color2a': {default: '#ffffff', parse: x => x, tween: true},
  'color1b': {default: '#222222', parse: x => x, tween: true},
  'color2b': {default: '#dddddd', parse: x => x, tween: true},
  'c1mode': {default: 0, parse: parseInt},
  'c2mode': {default: 0, parse: parseInt},
  'c1alpha': {default: .5, parse: parseFloat, type: 'slider', tween: true},
  'c2alpha': {default: .5, parse: parseFloat, type: 'slider', tween: true},
  'bgColor': {default: '#f0f0f0', parse: x => x, tween: true},
  // spin mode
  'spin': {default: 0, parse: parseFloat, type: 'input', tween: true},
  'spinY': {default: 0, parse: parseFloat, tween: true},
  'spinYSpeed': {default: 0, parse: parseInt, type: 'slider', tween: true},
  'spinX': {default: 0, parse: parseFloat, tween: true},
  'spinXSpeed': {default: 0, parse: parseInt, type: 'slider', tween: true},
  'tileSize': {default: 60, parse: parseInt, type: 'slider', tween: true},
  'tileScale': {default: 1, parse: parseFloat, type: 'slider', tween: true},
  'margin': {default: 30, parse: parseInt, type: 'slider', tween: true},
  'shapeIterations': {default: 7, parse: parseInt, type: 'slider', tween: true},
  // patternMode
  'pattern': {default: 0, parse: parseFloat, type: 'input', tween: true},
  'curPattern': {default: 'sine', parse: x => x},
  'loopTrans': {default: false, parse: parseBool},
  'curTransitions': {default: [
      ['concentric asym', 'ltr', .5],['v-zags', 'ltr', 0]
    ], parse: JSON.parse},
  'patTileSize': {default: 40, parse: parseInt, type: 'slider', tween: true},
  'patTileScale': {default: .9, parse: parseFloat, type: 'slider', tween: true},
  'transLength': {default: .55, parse: parseFloat, type: 'slider', tween: true},
  'shortRotations': {default: false, parse: parseBool},
  'rotX': {default: false, parse: parseBool},
  'rotY': {default: false, parse: parseBool},
  // orbit mode
  'orbit': {default: 0, parse: parseFloat, type: 'input', tween: true},
  'curl': {default: 20, parse: parseInt, type: 'slider', tween: true},
  'bodies': {default: 30, parse: parseInt, type: 'slider', tween: true},
  'zoom': {default: 10, parse: parseInt, type: 'slider', tween: true},
  'growth': {default: 50, parse: parseInt, type: 'slider', tween: true},
  'camX': {default: 0, parse: parseFloat, tween: true},
  'camY': {default: 0, parse: parseFloat, tween: true}
};

function parseBool(val) {
  return val == 'false' ? false : (val == 'true' ? true : !!val);
}

function updateSetting(name, value) {
  if (settings[name].parse == JSON.parse) {
    this[name] = value;
    window.localStorage.setItem(name, JSON.stringify(value));
    return;
  }
  let val = settings[name].parse(value);
  let str = val;

  this[name] = val;
  window.localStorage.setItem(name, val);

  if (name == 'spin' || name == 'pattern' || name == 'orbit') {
    val = val.toFixed(1);
  }

  if (el(name)) {
    el(name).setAttribute('value', val);
    el(name).value = val;
  }

  if (settings[name].parse == parseFloat)
    str = str.toFixed(1);
  str = "" + str;
  if (str[0] == '0' && str[1] == '.')
    str = str.slice(1);

  if (settings[name].type == 'slider') {
    el(name).parentNode.querySelector('span').textContent = str;
  }
}

// load available settings from storage
Object.entries(settings).map(s => {
  let val = window.localStorage.getItem(s[0]);
  val = val ? s[1].parse(val) : s[1].default;
  updateSetting(s[0], val);
});
