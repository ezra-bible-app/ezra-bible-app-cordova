#!/usr/bin/env node

const path = require('path');

// Define the list of hooks to run
const hookPaths = [
  '../../node_modules/@red-mobile/nodejs-mobile-cordova/install/hooks/ios/before-plugin-install.js',
  '../../node_modules/@red-mobile/nodejs-mobile-cordova/install/hooks/ios/after-plugin-install.js',
  '../../node_modules/@red-mobile/nodejs-mobile-cordova/install/hooks/ios/fix-xcframework-path.js',
  '../../hooks/add_ios_cleanup_build_phase.js'
];

// Mock the Cordova context object
const context = {
  opts: {
    platforms: ['ios'],
    projectRoot: path.resolve(__dirname, '../../')
  }
};

console.log('Running hooks manually...');

for (const hookPath of hookPaths) {
  try {
    console.log(`\n--- Executing: ${hookPath} ---`);
    // Clear cache to ensure fresh require if needed, though usually not necessary for single run scripts
    delete require.cache[require.resolve(hookPath)];
    const hook = require(hookPath);
    hook(context);
    console.log(`--- Success: ${hookPath} ---`);
  } catch (error) {
    console.error(`--- Error executing ${hookPath}:`, error);
  }
}

console.log('\nAll hooks executed.');