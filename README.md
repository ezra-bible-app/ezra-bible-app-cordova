# Ezra Bible App Cordova

Ezra Bible App Cordova is the [Cordova](https://cordova.apache.org) app of **Ezra Bible App**. The currently supported target is Android (at least Android version 5 in combination with at least *System Webview* version 55) and this app is only developed for tablets that at least have a 7 inch screen.

This repository contains the Cordova configuration and re-uses the source code of the [main Ezra Bible App repository](https://github.com/ezra-project/ezra-project), which is embedded into this repository as a Git submodule. Furthermore, like the Electron app, the Cordova app also uses [node-sword-interface](https://github.com/ezra-project/node-sword-interface) as its interface to the [SWORD library](http://www.crosswire.org/sword).

[nodejs-mobile](https://code.janeasystems.com/nodejs-mobile), a Node.js runtime for Android and iOS is used to enable a complete re-use of source code between the Electron and the Cordova app of Ezra Bible App.

The Ezra Bible App is currently being developed with Android as its first target and planned to be released as part of Ezra Bible App 0.17.0.

## Build

More detailed build instructions will be added soon.

### Requirements

The Build requires Cordova 7.x. This is based on a [requirement of nodejs-mobile](https://code.janeasystems.com/nodejs-mobile/getting-started-cordova).
