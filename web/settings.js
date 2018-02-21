var el = document.getElementById.bind(document);

var settings = {
  // tile grid
  'tileSize': {default: 10, parse: parseInt, attr: 'value'},
  'tilePadding': {default: 0, parse: parseInt, attr: 'value'},
  'shapeIterations': {default: 10, parse: parseInt},
  'gridX': {default: 30, parse: parseInt, attr: 'value'},
  'gridY': {default: 30, parse: parseInt, attr: 'value'},
  // playback
  'speed': {default: 40, parse: parseInt},
  'rewind': {default: false, parse: parseBool, attr: 'checked'},
  'pause': {default: false, parse: parseBool},
  // colors
  'color1a': {default: '#00000090', parse: x => x},
  'color2a': {default: '#ffffff90', parse: x => x},
  'bgColor': {default: '#f0f0f0', parse: x => x},
  // orbit mode
  'orbit': {default: 0, parse: parseFloat},
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
  if (settings[name].attr)
    el(name)[settings[name].attr] = val;
}

function loadDefaults(el) {
  Object.entries(settings).map(s => updateSetting([s[0]], s[1].default));
  if (el) el.blur();
}

// load available settings from storage
Object.entries(settings).map(s => updateSetting(s[0],
  s[1].parse(window.localStorage.getItem(s[0])) || s[1].default));
