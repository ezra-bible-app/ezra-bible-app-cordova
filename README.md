# Ezra Bible App Cordova

Ezra Bible App Cordova is the [Cordova](https://cordova.apache.org) app of **Ezra Bible App**. The currently supported target is Android (at least Android version 5 in combination with at least *System Webview* version 55).

This repository contains the Cordova configuration and re-uses the source code of the [main Ezra Bible App repository](https://github.com/ezra-project/ezra-project), which is embedded into this repository as a Git submodule. Furthermore, like the Electron app, the Cordova app also uses [node-sword-interface](https://github.com/ezra-project/node-sword-interface) as its interface to the [SWORD library](http://www.crosswire.org/sword).

[nodejs-mobile](https://code.janeasystems.com/nodejs-mobile), a Node.js runtime for Android and iOS is used to enable a complete re-use of source code between the Electron and the Cordova app of Ezra Bible App.

The Ezra Bible App is currently being developed with Android as its first target and planned to be released as part of Ezra Bible App 0.17.0.

## Installing build requirements

The Build requires Cordova 7.x. This is based on a [requirement of nodejs-mobile](https://code.janeasystems.com/nodejs-mobile/getting-started-cordova). The following guideline assumes that you are working on Linux.

### 1) Install Cordova Requirements

Follow the steps described here:
https://cordova.apache.org/docs/en/7.x/guide/platforms/android/index.html#installing-the-requirements

a) Install JDK 8

b) Install the Android Studio.

### 2) Install packages from SDK manager

a) Open the SDK Manager from the Android Studio start dialog.

b) Install the SDK packages for the API level we currently target (currently Android API level 29 / Android 10).

c) Install the Android ndk version 21.3 (dependency of nodejs-mobile)

### 3) Install Gradle

Install Gradle (version 6.7.1) by following the [instructions here](https://gradle.org/install/#manually).

### 4) Configure environment variables

Put the following export statements into your `~/.bashrc` (for your own user) or globally into `/etc/profile`.

You will need to adjust the paths based on the specific packages we are using.

    export JAVA_HOME=/usr/local/jdk1.8.0_271
    export ANDROID_HOME=/opt/Android/SDK
    export ANDROID_NDK_HOME=/opt/Android/SDK/ndk/r21b
    export PATH=$PATH:/usr/local/gradle/gradle-6.7.1/bin:/usr/local/android-studio/bin:/usr/local/jdk1.8.0_271/bin:/opt/Android/SDK/platform-tools:/opt/Android/SDK/emulator:/opt/Android/SDK/tools/:/opt/Android/SDK/tools/bin

### 5) Configure an emulator if needed

Follow the [instructions in the Cordova install guide](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/index.html#setting-up-an-emulator) to configure an emulator.

## Performing the build

TODO

## Deploying the app to a device

TODO
