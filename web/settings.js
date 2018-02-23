var el = document.getElementById.bind(document);

var settings = {
  'mode': {default: 'spin', parse: x => x, attr: 'value'},
  // playback
  'rewind': {default: false, parse: parseBool, attr: 'value'},
  'playing': {default: true, parse: parseBool, attr: 'value'},
  'spinSpeed': {default: 40, parse: parseInt, attr: 'value', type: 'slider'},
  'patternSpeed': {default: 40, parse: parseInt, attr: 'value', type: 'slider'},
  'orbitSpeed': {default: 40, parse: parseInt, attr: 'value', type: 'slider'},
  // colors
  'color1a': {default: '#000000', parse: x => x, attr: 'value'},
  'color2a': {default: '#ffffff', parse: x => x, attr: 'value'},
  'color1b': {default: '#222222', parse: x => x, attr: 'value'},
  'color2b': {default: '#dddddd', parse: x => x, attr: 'value'},
  'g1x': {default: true, parse: parseBool, attr: 'checked'},
  'g1y': {default: false, parse: parseBool, attr: 'checked'},
  'g2x': {default: false, parse: parseBool, attr: 'checked'},
  'g2y': {default: true, parse: parseBool, attr: 'checked'},
  'c1alpha': {default: 160, parse: parseInt, attr: 'value', type: 'slider'},
  'c2alpha': {default: 160, parse: parseInt, attr: 'value', type: 'slider'},
  'bgColor': {default: '#f0f0f0', parse: x => x, attr: 'value'},
  // spin mode
  'spin': {default: 0, parse: parseFloat},
  'tileSize' : {default: 30, parse: parseInt, attr: 'value', type: 'slider'},
  'tileScale': {default: 1, parse: parseFloat, attr: 'value', type: 'slider'},
  'margin': {default: 30, parse: parseInt, attr: 'value', type: 'slider'},
  'shapeIterations': {default: 7, parse: parseInt, attr: 'value', type: 'slider'},
  // orbit mode
  'orbit': {default: 0, parse: parseFloat},
  'radius': {default: 20, parse: parseInt, attr: 'value', type: 'slider'},
  'bodies': {default: 30, parse: parseInt, attr: 'value', type: 'slider'},
  'zoom': {default: 10, parse: parseInt, attr: 'value', type: 'slider'},
  'camX': {default: 0, parse: parseInt},
  'camY': {default: 0, parse: parseInt}
};

function parseBool(val) {
  return val == 'false' ? false : (val == 'true' ? true : !!val);
}

function updateSetting(name, value) {
  const val = settings[name].parse(value);
  this[name] = val;
  window.localStorage.setItem(name, val);
  if (settings[name].attr) {
    el(name).setAttribute(settings[name].attr, val);
    if (settings[name].attr == 'value')
      el(name).value = val;
  }

  if (settings[name].type == 'slider') {
    el(name).parentNode.querySelector('span').textContent = val;
  }
}

function loadDefaults() {
  Object.entries(settings).map(s => updateSetting([s[0]], s[1].default));
}

// load available settings from storage
Object.entries(settings).map(s => updateSetting(s[0],
  s[1].parse(window.localStorage.getItem(s[0]) || s[1].default)));
