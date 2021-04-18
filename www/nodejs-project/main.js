/* This file is part of Ezra Bible App.

   Copyright (C) 2019 - 2021 Tobias Klein <contact@ezra-project.net>

   Ezra Bible App is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 2 of the License, or
   (at your option) any later version.

   Ezra Bible App is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Ezra Project. See the file LICENSE.
   If not, see <http://www.gnu.org/licenses/>. */

const PlatformHelper = require('./app/lib/platform_helper.js');
const IPC = require('./app/backend/ipc/ipc.js');
global.ipc = null;

class Main {
  init(isDebug) {
    // Require the 'cordova-bridge' to enable communications between the
    // Node.js app and the Cordova app.
    global.cordova = require('cordova-bridge');
    this.platformHelper = new PlatformHelper();
    this.isDebug = isDebug;

    if (!isDebug) {
      this.initSentry();
    }

    this.initAppEvents();

    global.ipc = new IPC();
    global.ipc.initNonPersistentIpc();

    cordova.channel.send('nodejs: main.js loaded');
  }

  initSentry() {
    var pjson = require('./package.json');
    var version = pjson.version;
    console.log("Configuring Sentry (node.js) with app version: " + version);

    global.Sentry = require('@sentry/node/dist');

    Sentry.init({
      dsn: 'https://977e321b83ec4e47b7d28ffcbdf0c6a1@sentry.io/1488321',
      release: version
    });
  }

  initPersistentIpc() {
    console.log("Initializing persistent IPC!");

    this.initStorage();
    global.ipc.init(this.isDebug);

    return true;
  }

  initDatabase() {
    console.log("Initializing database!");
    global.ipc.initDatabase(this.isDebug);

    return true;
  }

  initAppEvents() {
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

  initStorage() {
    const fs = require('fs');
    var path = this.platformHelper.getUserDataPath();

    if (!fs.existsSync(path)) {
      console.log("Creating data directory for app at " + path);
      fs.mkdirSync(path, { recursive: true });
    }
  }
}

module.exports = Main;