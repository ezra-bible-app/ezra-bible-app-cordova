/* This file is part of ezra-project-cordova.

   Copyright (C) 2019 - 2020 Tobias Klein <contact@ezra-project.net>

   ezra-project-cordova is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 2 of the License, or
   (at your option) any later version.

   ezra-project-cordova is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Ezra Project. See the file LICENSE.
   If not, see <http://www.gnu.org/licenses/>. */

class Main {
  init(isDebug) {
    // Require the 'cordova-bridge' to enable communications between the
    // Node.js app and the Cordova app.
    global.cordova = require('cordova-bridge');

    cordova.channel.send('nodejs: main.js loaded');

    const IPC = require('./app/ipc/ipc.js');
    var ipc = new IPC();

    console.log("Initializing IPC!");
    ipc.init(isDebug);

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
}

module.exports = Main;