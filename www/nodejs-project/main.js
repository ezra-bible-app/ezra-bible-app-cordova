// Require the 'cordova-bridge' to enable communications between the
// Node.js app and the Cordova app.
global.cordova = require('cordova-bridge');

function init() {
  cordova.channel.send('nodejs: main.js loaded');

  const IPC = require('./app/ipc/ipc.js');
  var ipc = new IPC();

  console.log("Initializing IPC!");
  ipc.init();
}

init();

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

/*
// Post an event to Cordova.
cordova.channel.post('started');

// Post an event with a message.
cordova.channel.post('started', 'main.js loaded');

// Listen to messages from Cordova.
cordova.channel.on('message', (msg) => {
  console.log('[node] MESSAGE received: "%s"', msg);
  // Reply sending a user defined object.
  cordova.channel.send(new Reply('Message received!', msg));
});

// Listen to event 'myevent' from Cordova.
cordova.channel.on('myevent', (msg) => {
  console.log('[node] MYEVENT received with message: "%s"', msg);
});

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
*/
