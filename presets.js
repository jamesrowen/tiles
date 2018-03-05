var settingsByMode = {
  'all': ['mode', 'playing', 'rewind', 'shapeIterations'],
  'spin' : ['spinSpeed', 'spin', 'spinY', 'spinYSpeed', 'spinX', 'spinXSpeed', 'tileSize', 'tileScale', 'margin'],
  'pattern': ['patternSpeed', 'pattern', 'curPattern', 'loopTrans', 'curTransitions', 'tileSize', 'tileScale', 'animationLength', 'shortRotations', 'rotX', 'rotY'],
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
  {mode: "pattern",playing: true,rewind: false,shapeIterations: 8,patternSpeed: 37,pattern: 0,curPattern: "teeth",loopTrans: true,curTransitions: [["v-zags","center-circle",0.3891992000011241]],tileSize: 56,tileScale: 2,animationLength: 0.37,shortRotations: true,rotX: false,rotY: false},
  {mode: "orbit",playing: true,rewind: true,shapeIterations: 8,orbitSpeed: 24,orbit: 3.7467108700007334,curl: 2,bodies: 620,zoom: 43,growth: 49,camX: 1158.0643253063342,camY: 348.5731432706755},
  {mode: "orbit",playing: true,rewind: false,shapeIterations: 8,orbitSpeed: 14,orbit: 0.2139395200003869,curl: 6,bodies: 690,zoom: 70,growth: 100,camX: 911.1633102231315,camY: 1.3978655948883443},
  {color1a: "#000000",color2a: "#ffffff",color1b: "#324c75",color2b: "#fff9d9",c1mode: 0,c2mode: 1,c1alpha: 0.77,c2alpha: 0.4,bgColor: "#2e312e"},
  {color1a: "#bc2606",color2a: "#b5ffe8",color1b: "#324c75",color2b: "#fff0cb",c1mode: 1,c2mode: 4,c1alpha: 0.77,c2alpha: 0.82,bgColor: "#2e312e"},
  {color1a: "#84d3ff",color2a: "#ff6890",color1b: "#9effae",color2b: "#efddb5",c1mode: 1,c2mode: 1,c1alpha: 0.77,c2alpha: 0.81,bgColor: "#2e312e"}
];
