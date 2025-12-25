#!/bin/sh

# Usage:
#   ./build.sh                 # debug build (default)
#   ./build.sh release         # release build
#   ./build.sh clean           # clean platforms and plugins, then debug build
#   ./build.sh clean release   # clean platforms and plugins, then release build

MODE=debug
CLEAN=false

# Parse arguments: optional 'clean' and optional build mode (debug/release)
for arg in "$@"; do
  case "$arg" in
    clean)
      CLEAN=true
      ;;
    release)
      MODE=release
      ;;
    debug)
      MODE=debug
      ;;
  esac
done

# Perform clean if requested
if [ "$CLEAN" = true ]; then
  echo "Cleaning Cordova platforms and plugins directories."
  rm -rf platforms plugins
fi

rm -rf www/node_modules
rm -rf www/nodejs-project/node_modules

# node-sword-interface is included separately underneith www/nodesjs-project, therefore uninstall it here
npm --prefix ezra-bible-app uninstall node-sword-interface

npm --prefix ezra-bible-app run compile-pug
npm --prefix ezra-bible-app run commit-info

# Create JavaScript distribution (using Browserify)
npm --prefix ezra-bible-app run bundle
npm --prefix www/nodejs-project install --ignore-scripts
./ezra-bible-app/node_modules/.bin/node-prune www/nodejs-project/node_modules

# Remove all directories under www whose path contains '.bin'
# For some reason those directories cause Cordova build issues
find www -type d -name '*.bin*' -prune -exec rm -rf {} +

git clone https://github.com/karlkleinpaste/biblesync.git www/nodejs-project/node_modules/node-sword-interface/biblesync
git -C www/nodejs-project/node_modules/node-sword-interface/biblesync checkout 2.1.0

# Prepare Cordova project (installs platform, plugins, etc.)
cordova prepare

if [ "$MODE" = "release" ]; then
  echo "Running Cordova release build..."
  cordova build --release -- --packageType=apk
else
  echo "Running Cordova debug build..."
  cordova build
fi
