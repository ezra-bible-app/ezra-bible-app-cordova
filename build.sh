#!/bin/bash

usage() {
  echo "Usage:"
  echo "  ./build.sh -p android              # debug build for android"
  echo "  ./build.sh -p ios                  # debug build for ios"
  echo "  ./build.sh -p android -m release   # release build for android"
  echo "  ./build.sh -p ios -m release       # release build for ios"
  echo "  ./build.sh -c -p android           # clean and build android"
  echo "  ./build.sh -c -p ios               # clean and build ios"
  exit 0
}

MODE=debug
CLEAN=false
PLATFORM=""

# Parse arguments
while [ "$#" -gt 0 ]; do
  case "$1" in
    -c|--clean)
      CLEAN=true
      shift
      ;;
    -m|--mode)
      MODE="$2"
      shift 2
      ;;
    -p|--platform)
      PLATFORM="$2"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Unknown parameter: $1"
      exit 1
      ;;
  esac
done

if [ -z "$PLATFORM" ]; then
  echo "Error: Please specify a platform (-p android or -p ios)."
  exit 1
fi

# Check if critical directories are missing
if [ ! -d "platforms" ] || [ ! -d "plugins" ] || [ ! -d "node_modules" ]; then
  echo "One or more critical directories (platforms, plugins, node_modules) are missing. Forcing clean build."
  CLEAN=true
fi

# Perform clean if requested
if [ "$CLEAN" = true ]; then
  echo "Cleaning Cordova platforms, plugins, node_modules directories."
  rm -rf platforms plugins node_modules
  
  if [ "$PLATFORM" = "ios" ]; then
    cordova platform add ios@7.1.0
    echo "iOS platform added. Exiting to allow manual tinkering."
    echo "Run './build.sh -p ios' (without -c) to build."
    exit 0
  elif [ "$PLATFORM" = "android" ]; then
    cordova platform add android@14.0.1
  fi
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
./ezra-bible-app/node_modules/.bin/clean-modules clean -y ./www/nodejs-project/node_modules/

# Remove all directories under www whose path contains '.bin'
# For some reason those directories cause Cordova build issues
find www -type d -name '*.bin*' -prune -exec rm -rf {} +

git clone https://github.com/karlkleinpaste/biblesync.git www/nodejs-project/node_modules/node-sword-interface/biblesync
git -C www/nodejs-project/node_modules/node-sword-interface/biblesync checkout 2.1.0

echo ""

if [ "$PLATFORM" = "android" ]; then
  if [ "$MODE" = "release" ]; then
    echo "Running Cordova release build for Android..."
    cordova build android --release -- --packageType=apk
  else
    echo "Running Cordova debug build for Android..."
    cordova build android
  fi
elif [ "$PLATFORM" = "ios" ]; then
  if [ "$MODE" = "release" ]; then
    echo "Running Cordova release build for iOS..."
    cordova build ios --release
  else
    echo "Running Cordova debug build for iOS..."
    cordova build ios -- --developmentTeam="62TW7J7JJ7"
  fi
fi
