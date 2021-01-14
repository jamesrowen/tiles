var el = document.getElementById.bind(document);
function elements(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
}

var settings = {
  'mode': {default: 'spin', parse: x => x},
  // playback
  'playing': {default: false, parse: parseBool},
  'rewind': {default: false, parse: parseBool},
  'spinSpeed': {default: 26, parse: parseInt, type: 'slider', tween: true},
  'patternSpeed': {default: 30, parse: parseInt, type: 'slider', tween: true},
  'orbitSpeed': {default: 40, parse: parseInt, type: 'slider', tween: true},
  // colors
  'color1a': {default: '#101010', parse: x => x, tween: true},
  'color2a': {default: '#f0f0f0', parse: x => x, tween: true},
  'color1b': {default: '#101010', parse: x => x, tween: true},
  'color2b': {default: '#f0f0f0', parse: x => x, tween: true},
  'c1mode': {default: 0, parse: parseInt},
  'c2mode': {default: 0, parse: parseInt},
  'c1alpha': {default: .97, parse: parseFloat, type: 'slider', tween: true},
  'c2alpha': {default: .97, parse: parseFloat, type: 'slider', tween: true},
  'bgColor': {default: '#7c7b78', parse: x => x, tween: true},
  // spin mode
  'spin': {default: 0, parse: parseFloat, type: 'input', tween: true},
  'spinY': {default: 0, parse: parseFloat, tween: true},
  'spinYSpeed': {default: 0, parse: parseInt, type: 'slider', tween: true},
  'spinX': {default: 0, parse: parseFloat, tween: true},
  'spinXSpeed': {default: 0, parse: parseInt, type: 'slider', tween: true},
  'tileSize': {default: 62, parse: parseInt, type: 'slider', tween: true},
  'tileScale': {default: .96, parse: parseFloat, type: 'slider', tween: true},
  'margin': {default: 32, parse: parseInt, type: 'slider', tween: true},
  'shapeIterations': {default: 8, parse: parseInt, type: 'slider', tween: true},
  // patternMode
  'pattern': {default: 0, parse: parseFloat, type: 'input', tween: true},
  'curPattern': {default: 'v-zags', parse: x => x},
  'loopTrans': {default: false, parse: parseBool},
  'curTransitions': {default: [], parse: JSON.parse},
  'patTileSize': {default: 56, parse: parseInt, type: 'slider', tween: true},
  'patTileScale': {default: .97, parse: parseFloat, type: 'slider', tween: true},
  'transLength': {default: .3, parse: parseFloat, type: 'slider', tween: true},
  'shortRotations': {default: false, parse: parseBool},
  'rotX': {default: false, parse: parseBool},
  'rotY': {default: false, parse: parseBool},
  // orbit mode
  'orbit': {default: 4.19, parse: parseFloat, type: 'input', tween: true},
  'curl': {default: 22, parse: parseInt, type: 'slider', tween: true},
  'numTiles': {default: 270, parse: parseInt, type: 'slider', tween: true},
  'zoom': {default: 63, parse: parseInt, type: 'slider', tween: true},
  'growth': {default: 100, parse: parseInt, type: 'slider', tween: true},
  'camX': {default: 22, parse: parseFloat, tween: true},
  'camY': {default: 22, parse: parseFloat, tween: true},
  // help text
  'firstTime': {default: true, parse: parseBool},
  'guidePos': {default: -1, parse: parseInt},
  'orbitHelpPos': {default: -1, parse: parseInt}
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

let guideSteps = [
  ['-450px', 'Welcome! Try moving some sliders', '#modes .slider'],
  ['-836px', 'Press Space to pause', 'none'],
  ['-746px', 'Press R to rewind', 'none'],
  ['-115px', 'Try the presets!', '#presets .button'],
  [  '78px', 'Color presets are here', '#colorPresets .button'],
  ['-469px', 'Click here to change mode', '#modeTabs div:nth-child(2)'],
  ['-315px', 'Click some transitions', '.trans'],
  ['-444px', 'Click here to keep them looping', '#loopTrans'],
  ['-140px', 'Try the presets in each mode!', '#presets .button'],
  ['-450px', 'Press Esc or click the canvas to hide the controls', 'none']
];
function nextGuideStep(delay) {
  el('bubble').classList.remove('open');
  elements(guideSteps[guidePos][2]).map(e => e.classList.remove('highlight'));
  updateSetting('guidePos', guidePos + 1);
  window.setTimeout(setGuide, delay);
}
function setGuide() {
  if (guidePos < 10) {
    let bubble = el('bubble');
    bubble.style.left = guideSteps[guidePos][0];
    el('bubbleText').textContent = guideSteps[guidePos][1];
    bubble.classList.add('open');

    elements(guideSteps[guidePos][2]).map(e => e.classList.add('highlight'));
    if (guidePos == 2)
      updateSetting('playing', true);
    if (guidePos == 6)
      updateSetting('rewind', false);
    if (guidePos == 9)
      el('bubbleArrow').style.display = 'none';
  }
}

// load available settings from storage
Object.entries(settings).map(s => {
  let val = window.localStorage.getItem(s[0]);
  val = val ? s[1].parse(val) : s[1].default;
  updateSetting(s[0], val);
});

// load guide
if (guidePos == -1) {
  updateSetting('guidePos', 0);
  window.setTimeout(() => el('mode').classList.remove('closed'), 4500);
  window.setTimeout(setGuide, 6500);
} else {
  el('mode').classList.remove('closed');
  window.setTimeout(setGuide, 1000);
}
// delay start of animation on first load
if (firstTime) {
  window.setTimeout(() => {
    updateSetting('playing', true);
    updateSetting('firstTime', false);
  }, 1500);
}
