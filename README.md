# Ezra Bible App Cordova

Ezra Bible App Cordova is the [Cordova](https://cordova.apache.org) app of **Ezra Bible App**. The currently supported target is Android (at least Android version 7 in combination with at least *System Webview* version 55).

This repository contains the Cordova configuration and re-uses the source code of the [main Ezra Bible App repository](https://github.com/ezra-project/ezra-project), which is embedded into this repository as a Git submodule. Furthermore, like the Electron app, the Cordova app also uses [node-sword-interface](https://github.com/ezra-project/node-sword-interface) as its interface to the [SWORD library](http://www.crosswire.org/sword).

[nodejs-mobile](https://github.com/nodejs-mobile/nodejs-mobile), a Node.js runtime for Android and iOS is used to enable a complete re-use of source code between the Electron and the Cordova app of Ezra Bible App.
The specific Cordova plugin that integrates this runtime is called [nodejs-mobile-cordova](https://github.com/okhiroyuki/nodejs-mobile-cordova).

## Installing build requirements

The Build requires Cordova 12.x. This is based on a [requirement of nodejs-mobile-cordova](https://github.com/okhiroyuki/nodejs-mobile-cordova?tab=readme-ov-file#requirements). The following guideline assumes that you are working on Linux.

### 1) Install Cordova Requirements

Follow the steps described here:
https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html#installing-the-requirements

a) Install JDK 17 (at least)

b) Install the Android Studio.

### 2) Install packages from SDK manager

a) Open the SDK Manager from the Android Studio start dialog.

b) Install the SDK packages for the API level we currently target (currently Android API level 34 / Android 14).

c) Install the Android ndk version 27.2.12479018

### 3) Install Gradle

Install Gradle (version 7.6) by following the [instructions here](https://gradle.org/install/#manually).

### 4) Configure environment variables

Put the following export statements into your `~/.bashrc` (for your own user) or globally into `/etc/profile`.

You will need to adjust the paths based on the specific packages we are using.

    export JAVA_HOME=/usr/local/jdk-17.0.13
    export ANDROID_HOME=/opt/Android/SDK
    export ANDROID_NDK_HOME=/opt/Android/SDK/ndk/27.2.12479018
    export PATH=$PATH:/usr/local/gradle/gradle-7.6/bin:/usr/local/android-studio/bin:/usr/local/jdk-17.0.13/bin:/opt/Android/SDK/platform-tools:/opt/Android/SDK/emulator:/opt/Android/SDK/tools/:/opt/Android/SDK/tools/bin

### 5) Configure an emulator if needed

Follow the [instructions in the Cordova install guide](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html#setting-up-an-emulator) to configure an emulator.

## 6) Performing the build

 1) Make sure this repository is cloned including submodules (ezra-bible-app is included that way)

 2) Run the script `build.sh`

## 7) Deploying the app to a device

Connect the Android device with a USB cable and make sure it is listed when invoking `adb devices`.

To deploy the app, run the following Cordova command:

`cordova run`
