var el = document.getElementById.bind(document);

var settings = {
  'mode': {default: 'spin', parse: x => x},
  // playback
  'playing': {default: true, parse: parseBool},
  'rewind': {default: false, parse: parseBool},
  'spinSpeed': {default: 40, parse: parseInt, type: 'slider'},
  'patternSpeed': {default: 40, parse: parseInt, type: 'slider'},
  'orbitSpeed': {default: 40, parse: parseInt, type: 'slider'},
  // colors
  'color1a': {default: '#000000', parse: x => x},
  'color2a': {default: '#ffffff', parse: x => x},
  'color1b': {default: '#222222', parse: x => x},
  'color2b': {default: '#dddddd', parse: x => x},
  'g1x': {default: true, parse: parseBool},
  'g1y': {default: false, parse: parseBool},
  'g2x': {default: false, parse: parseBool},
  'g2y': {default: true, parse: parseBool},
  'c1alpha': {default: 160, parse: parseInt, type: 'slider'},
  'c2alpha': {default: 160, parse: parseInt, type: 'slider'},
  'bgColor': {default: '#f0f0f0', parse: x => x},
  // spin mode
  'spin': {default: 0, parse: parseFloat},
  'spinY': {default: 0, parse: parseFloat},
  'spinYSpeed': {default: 0, parse: parseInt, type: 'slider'},
  'spinX': {default: 0, parse: parseFloat},
  'spinXSpeed': {default: 0, parse: parseInt, type: 'slider'},
  'tileSize': {default: 30, parse: parseInt, type: 'slider'},
  'tileScale': {default: 1, parse: parseFloat, type: 'slider'},
  'margin': {default: 30, parse: parseInt, type: 'slider'},
  'shapeIterations': {default: 7, parse: parseInt, type: 'slider'},
  // patternMode
  'pattern': {default: 0, parse: parseFloat},
  // orbit mode
  'orbit': {default: 0, parse: parseFloat},
  'curl': {default: 20, parse: parseInt, type: 'slider'},
  'bodies': {default: 30, parse: parseInt, type: 'slider'},
  'zoom': {default: 10, parse: parseInt, type: 'slider'},
  'growth': {default: 50, parse: parseInt, type: 'slider'},
  'camX': {default: 0, parse: parseInt},
  'camY': {default: 0, parse: parseInt}
};

function parseBool(val) {
  return val == 'false' ? false : (val == 'true' ? true : !!val);
}

function updateSetting(name, value) {
  let val = settings[name].parse(value);
  let str = val;
  if (settings[name].parse == parseFloat)
    str = str.toFixed(1);
  str = "" + str;
  if (str[0] == '0' && str[1] == '.')
    str = str.slice(1);

  this[name] = val;
  window.localStorage.setItem(name, val);

  if (name == 'spin' || name == 'pattern' || name == 'orbit') {
    val = val.toFixed(1);
  }

  if (el(name)) {
    el(name).setAttribute('value', val);
    el(name).value = val;
  }

  if (settings[name].type == 'label') {
    el(name).textContent = str;
  }
  if (settings[name].type == 'slider') {
    el(name).parentNode.querySelector('span').textContent = str;
  }
}

function loadDefaults() {
  Object.entries(settings).map(s => updateSetting([s[0]], s[1].default));
}

// load available settings from storage
Object.entries(settings).map(s => updateSetting(s[0],
  s[1].parse(window.localStorage.getItem(s[0]) || s[1].default)));
