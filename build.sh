#!/bin/sh

rm -rf www/node_modules
rm -rf www/nodejs-project/node_modules

npm --prefix ezra-bible-app uninstall node-sword-interface
npm --prefix ezra-bible-app run compile-pug
npm --prefix ezra-bible-app run commit-info
npm --prefix ezra-bible-app run bundle
npm --prefix www/nodejs-project install --ignore-scripts
./ezra-bible-app/node_modules/.bin/node-prune www/nodejs-project/node_modules

# Remove all directories under www/nodejs-project whose path contains '.bin'
# For some reason those directories are causing issues with the cordova build
find www/nodejs-project -type d -name '*.bin*' -prune -exec rm -rf {} +

git clone https://github.com/karlkleinpaste/biblesync.git www/nodejs-project/node_modules/node-sword-interface/biblesync
git -C www/nodejs-project/node_modules/node-sword-interface/biblesync checkout 2.1.0

cordova prepare
cordova build
#cordova build --release -- --packageType=apk
