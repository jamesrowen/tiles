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

function loadPreset(i) {
  Object.entries(presets[i]).map(s => {
    updateSetting(s[0], s[1]);
  });
}

var presets = [
  {mode: "spin",playing: true,rewind: false,shapeIterations: 8,spinSpeed: 57,spin: 4.950363636429591,spinY: 0,spinYSpeed: 0,spinX: 0,spinXSpeed: 0,tileSize: 110,tileScale: 1.48,margin: 11},
  {mode: "pattern",playing: true,rewind: false,shapeIterations: 8,patternSpeed: 37,pattern: 0,curPattern: "teeth",loopTrans: true,curTransitions: [["v-zags","center-circle",0.3891992000011241]],patTileSize: 56,patTileScale: 2,animationLength: 0.37,shortRotations: true,rotX: false,rotY: false},
  {mode:"orbit",playing:true,rewind:true,shapeIterations:8,orbitSpeed:40,orbit:5.22760357996852,curl:22,bodies:270,zoom:63,growth:98,camX:22,camY:22},
  {mode: "orbit",playing: true,rewind: false,shapeIterations: 8,orbitSpeed: 14,orbit: 0.2139395200003869,curl: 6,bodies: 690,zoom: 70,growth: 100,camX: 911.1633102231315,camY: 1.3978655948883443},
  {color1a:"#0a0a0a",color2a:"#ffffff",color1b:"#182538",color2b:"#fff9d9",c1mode:2,c2mode:1,c1alpha:0.82,c2alpha:0.89,bgColor:"#2e312e"},
  {color1a: "#bc2606",color2a: "#b5ffe8",color1b: "#324c75",color2b: "#fff0cb",c1mode: 1,c2mode: 4,c1alpha: 0.77,c2alpha: 0.82,bgColor: "#2e312e"},
  {color1a: "#84d3ff",color2a: "#ff6890",color1b: "#9effae",color2b: "#efddb5",c1mode: 1,c2mode: 1,c1alpha: 0.77,c2alpha: 0.81,bgColor: "#2e312e"},
  {mode:"pattern",playing:true,rewind:false,shapeIterations:8,patternSpeed:19,pattern:0,curPattern:"icebergs",loopTrans:true,curTransitions:[["reeds","diagonal skew",0.5]],patTileSize:56,patTileScale:0.96,animationLength:0.46,shortRotations:true,rotX:false,rotY:false},
  {mode:"pattern",playing:true,rewind:false,shapeIterations:8,patternSpeed:25,pattern:0,curPattern:"ribbons",loopTrans:true,curTransitions:[["sine","ltr",0],["birds","rtl",0],["diamonds","cascade down",0]],patTileSize:56,patTileScale:0.96,animationLength:0.04,shortRotations:false,rotX:false,rotY:false},
  {mode: "orbit",playing: true,rewind: true,shapeIterations: 8,orbitSpeed: 24,orbit: 3.7467108700007334,curl: 2,bodies: 620,zoom: 43,growth: 49,camX: 1158.0643253063342,camY: 348.5731432706755},
  {color1a:"#000000",color2a:"#ffffff",color1b:"#324c75",color2b:"#fff0cb",c1mode:0,c2mode:0,c1alpha:1,c2alpha:1,bgColor:"#5b5b5b"},
  {mode:"orbit",playing:true,rewind:false,shapeIterations:8,orbitSpeed:24,orbit:0.8340804699998551,curl:2,bodies:620,zoom:80,growth:53,camX:924.7808466105498,camY:69.91956593190162},
];
