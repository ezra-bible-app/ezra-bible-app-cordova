// Require the 'cordova-bridge' to enable communications between the
// Node.js app and the Cordova app.
global.cordova = require('cordova-bridge');

function init() {
  cordova.channel.send('nodejs: main.js loaded');

  const IPC = require('./app/ipc/ipc.js');
  var ipc = new IPC();

  console.log("Initializing IPC!");
  ipc.init();

  // Handle the 'pause' and 'resume' events.
  // These are events raised automatically when the app switched to the
  // background/foreground.
  cordova.app.on('pause', (pauseLock) => {
    console.log('[node] app paused.');
    pauseLock.release();
  });

  cordova.app.on('resume', () => {
    console.log('[node] app resumed.');
    cordova.channel.post('engine', 'resumed');
  });
}

init();
