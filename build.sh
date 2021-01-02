#!/bin/sh

npm --prefix ezra-project uninstall node-sword-interface
npm --prefix ezra-project run compile-pug
npm --prefix ezra-project run browserify
cordova prepare
