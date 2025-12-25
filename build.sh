#!/bin/sh

# Usage:
#   ./build.sh          # debug build (default)
#   ./build.sh release  # release build

MODE=${1:-debug}

rm -rf www/node_modules
rm -rf www/nodejs-project/node_modules

npm --prefix ezra-bible-app uninstall node-sword-interface
npm --prefix ezra-bible-app run compile-pug
npm --prefix ezra-bible-app run commit-info
npm --prefix ezra-bible-app run bundle
npm --prefix www/nodejs-project install --ignore-scripts
./ezra-bible-app/node_modules/.bin/node-prune www/nodejs-project/node_modules

# Remove all directories under www whose path contains '.bin'
# For some reason those directories cause Cordova build issues
find www -type d -name '*.bin*' -prune -exec rm -rf {} +

git clone https://github.com/karlkleinpaste/biblesync.git www/nodejs-project/node_modules/node-sword-interface/biblesync
git -C www/nodejs-project/node_modules/node-sword-interface/biblesync checkout 2.1.0

cordova prepare

if [ "$MODE" = "release" ]; then
  echo "Running Cordova release build..."
  cordova build --release -- --packageType=apk
else
  echo "Running Cordova debug build..."
  cordova build
fi
