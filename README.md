# ezra-project-cordova

ezra-project-cordova is the [Cordova](https://cordova.apache.org) app for **Ezra Project**. The currently supported target is Android (at least version 7) and this app is only developed for tablets that at least have a 10 inch screen.

This repository contains the Cordova configuration and re-uses the source code of the [main Ezra Project repository](https://github.com/ezra-project/ezra-project), which is embedded into this repository as a Git submodule. Furthermore, like the Electron app, the Cordova app also uses [node-sword-interface](https://github.com/ezra-project/node-sword-interface) as its interface to the [SWORD library](http://www.crosswire.org/sword).

[nodejs-mobile](https://code.janeasystems.com/nodejs-mobile), a Node.js runtime for Android and iOS is used to enable a complete re-use of source code between the Electron and the Cordova app of Ezra Project.

The Ezra Project Cordova app is currently being developed with Android as its first target and planned to be released as part of Ezra Project 0.17.0.

## Build

Build instructions will be added soon.