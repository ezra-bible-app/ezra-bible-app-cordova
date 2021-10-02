#!/bin/sh

docker run -ti -v ${PWD}:/tmp/ezra-cordova ezra-cordova /bin/bash -c 'cd /tmp/ezra-cordova; /tmp/ezra-cordova/build.sh;'