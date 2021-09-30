#!/bin/bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR

npm --prefix ezra-bible-app uninstall --unsafe-perm=true --allow-root node-sword-interface
npm --prefix ezra-bible-app run compile-pug
npm --prefix ezra-bible-app run bundle
npm --prefix www/nodejs-project install --ignore-scripts

BIBLE_SYNC_DIR=$SCRIPT_DIR/www/nodejs-project/node_modules/node-sword-interface/biblesync

rm -r $BIBLE_SYNC_DIR
git clone https://github.com/karlkleinpaste/biblesync.git $BIBLE_SYNC_DIR
git -C $BIBLE_SYNC_DIR checkout 2.1.0

cordova prepare
cordova build
#cordova build --release
