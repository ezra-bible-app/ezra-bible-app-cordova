#!/bin/sh

npm --prefix ezra-bible-app uninstall node-sword-interface
npm --prefix ezra-bible-app run compile-pug
npm --prefix ezra-bible-app run browserify
npm --prefix www/nodejs-project install --ignore-scripts

git clone https://github.com/karlkleinpaste/biblesync.git www/nodejs-project/node_modules/node-sword-interface/biblesync
git -C www/nodejs-project/node_modules/node-sword-interface/biblesync checkout 2.1.0

cordova prepare
cordova build
#cordova build --release
