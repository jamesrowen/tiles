var settingsByMode = {
  'all': ['mode', 'playing', 'rewind', 'shapeIterations'],
  'spin' : ['spinSpeed', 'spin', 'spinY', 'spinYSpeed', 'spinX', 'spinXSpeed', 'tileSize', 'tileScale', 'margin'],
  'pattern': ['patternSpeed', 'pattern', 'curPattern', 'loopTrans', 'curTransitions', 'patTileSize', 'patTileScale', 'animationLength', 'shortRotations', 'rotX', 'rotY'],
  'orbit': ['orbitSpeed', 'orbit', 'curl', 'bodies', 'zoom', 'growth', 'camX', 'camY'],
  'color': ['color1a', 'color2a', 'color1b', 'color2b', 'c1mode', 'c2mode', 'c1alpha', 'c2alpha', 'bgColor']
}

function exportPreset(type) {
  let settingsToExport = (type == 'color') ? [] : settingsByMode.all;
  settingsToExport = settingsToExport.concat(settingsByMode[type]);
  let strings = settingsToExport.map(s => s + ':' + JSON.stringify(this[s]));
  el('exportText').innerHTML = '{' + strings.join(',') + '},';
}

function loadPreset(name) {
  Object.entries(presets[name]).map(s => {
    if (this[s[0]] != s[1]) {
      if (settings[s[0]].tween)
        tweens.push([s[0], this[s[0]], s[1], 0]);
      else
        updateSetting(s[0], s[1]);
    }
  });
}

var tweens = [];
function updateTweens(tick) {
  for (let t of tweens) {
    t[3] += tick / 2;
    if (['color1a', 'color1b', 'color2a', 'color2b', 'bgColor'].includes(t[0]))
      updateSetting(t[0], lerpColor(color(t[1]), color(t[2]), min(t[3], 1)).toString('#rrggbb'));
    else
      updateSetting(t[0], lerp(t[1], t[2], min(t[3], 1)));
  }
  tweens = tweens.filter(t => t[3] < 1);
}

var presets = {
  's1': {mode:"spin",playing:true,rewind:false,shapeIterations:8,spinSpeed:57,spin:4.950363636429591,spinY:0,spinYSpeed:0,spinX:0,spinXSpeed:0,tileSize:110,tileScale:1.48,margin:11},
  's2': {mode:"spin",playing:true,rewind:false,shapeIterations:2,spinSpeed:34,spin:0,spinY:0,spinYSpeed:0,spinX:0,spinXSpeed:0,tileSize:54,tileScale:0.76,margin:11},
  's3': {mode:"spin",playing:true,rewind:true,shapeIterations:6,spinSpeed:23,spin:0,spinY:0,spinYSpeed:15,spinX:0,spinXSpeed:11,tileSize:67,tileScale:1.28,margin:11},
  's4': {mode:"spin",playing:true,rewind:false,shapeIterations:8,spinSpeed:15,spin:0,spinY:0,spinYSpeed:0,spinX:0,spinXSpeed:0,tileSize:63,tileScale:0.96,margin:32},
  'p1': {mode:"pattern",playing:true,rewind:false,shapeIterations:8,patternSpeed:29,pattern:0,loopTrans:true,curTransitions:[["v-zags","center-circle",0.5],["sine","center-circle",0]],patTileSize:56,patTileScale:2,animationLength:0.32,shortRotations:true,rotX:false,rotY:false},
  'p2': {mode:"pattern",playing:true,rewind:false,shapeIterations:8,patternSpeed:19,pattern:0,loopTrans:true,curTransitions:[["birds","diagonal skew",0.5]],patTileSize:56,patTileScale:0.96,animationLength:0.46,shortRotations:true,rotX:false,rotY:false},
  'p3': {mode:"pattern",playing:true,rewind:false,shapeIterations:8,patternSpeed:21,pattern:0,loopTrans:true,curTransitions:[["sine","ltr",0],["birds","rtl",0],["diamonds","cascade down",0],["v-zags","cascade up",0]],patTileSize:56,patTileScale:0.96,animationLength:0.04,shortRotations:false,rotX:false,rotY:false},
  'o1': {mode:"orbit",playing:true,rewind:true,shapeIterations:8,orbitSpeed:40,orbit:5.22760357996852,curl:22,bodies:270,zoom:63,growth:100,camX:22,camY:22},
  'o2': {mode:"orbit",playing:true,rewind:true,shapeIterations:8,orbitSpeed:13,orbit:-0.17414040000207986,curl:6,bodies:1150,zoom:60,growth:110,camX:15.711408762684869,camY:-109.01611520438132},
  'o3': {mode:"orbit",playing:true,rewind:false,shapeIterations:8,orbitSpeed:7,orbit:15.357662340006689,curl:4,bodies:1740,zoom:29,growth:35,camX:729.4914493146417,camY:326.6720902687832},
  'o4': {mode:"orbit",playing:true,rewind:false,shapeIterations:8,orbitSpeed:24,orbit:0.5,curl:2,bodies:620,zoom:100,growth:53,camX:1044.976058263188,camY:-68.97554258512301},
  'o5': {mode:"orbit",playing:true,rewind:false,shapeIterations:8,orbitSpeed:8,orbit:8.968018660000714,curl:18,bodies:1400,zoom:14,growth:91,camX:440.7436324491704,camY:263.69162366872723},
  'o6': {mode:"orbit",playing:true,rewind:true,shapeIterations:8,orbitSpeed:3,orbit:3.0024883100007376,curl:17,bodies:1510,zoom:15,growth:101,camX:258.11844328981726,camY:130.69523230436613},
  'c1': {color1a:"#101010",color2a:"#f0f0f0",color1b:"#101010",color2b:"#f0f0f0",c1mode:0,c2mode:0,c1alpha:1,c2alpha:1,bgColor:"#5b5b5b"},
  'c2': {color1a:"#0a0a0a",color2a:"#ffffff",color1b:"#182538",color2b:"#fff9d9",c1mode:2,c2mode:1,c1alpha:0.82,c2alpha:0.89,bgColor:"#2e312e"},
  'c3': {color1a:"#bc2606",color2a:"#b5ffe8",color1b:"#324c75",color2b:"#fff0cb",c1mode:1,c2mode:4,c1alpha:0.77,c2alpha:0.82,bgColor:"#2e312e"},
  'c4': {color1a:"#31b7e7",color2a:"#fbfc83",color1b:"#c0f3cb",color2b:"#c14447",c1mode:1,c2mode:1,c1alpha:0.8,c2alpha:0.81,bgColor:"#232523"},
};
