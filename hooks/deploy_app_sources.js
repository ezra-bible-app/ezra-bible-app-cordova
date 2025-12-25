// deploy_app_sources.js
// ----------------------
// Cordova hook script used to prepare the web and Node.js project sources
// for the Android build of the Ezra Bible App.
//
// This script is executed by Cordova during the build/deploy process. It
// copies selected resources from the `ezra-bible-app` subproject into the
// Cordova `www` directory and its `www/nodejs-project` subfolder.
//
// Responsibilities:
// - Copy frontend assets (HTML, CSS, JS, images, templates, libs, dist, etc.)
//   into `www/` so they are packaged into the Android APK.
// - Copy backend/Node.js related files (platform helper, language mapper,
//   backend code, database, locales, etc.) into `www/nodejs-project/`.
// - Only runs when the Android platform is part of the current Cordova
//   build (`context.opts.cordova.platforms` contains `android`).

const fs = require('fs');
const path = require('path');

// The `copy` helper below uses `fs.cp` with `{ recursive: true }` to mirror
// directory structures from `ezra-bible-app/<source>` to `<targetRoot>/<source>`
// under the Cordova project root.
function copy(root, source, targetRoot) {
    const sourcePath = path.join(root, 'ezra-bible-app', source);
    const targetPath = path.join(root, targetRoot, source);

    return fs.cp(sourcePath, targetPath, {
        recursive: true
    }, function (err) {
        if (err) {
            console.error("Failed to copy " + sourcePath + " to " + targetPath);
        } else {
            console.log("Copied " + sourcePath + " to " + targetPath + " successfully");
        }
    });
}

module.exports = function (context) {
    if (context.opts.cordova.platforms.indexOf('android') < 0) {
        return;
    }

    const wwwSources = [
      'app/frontend/platform_init.js',
      'app/templates',
      'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
      'node_modules/@fortawesome/fontawesome-free/css/solid.min.css',
      'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
      'node_modules/chart.js/dist/Chart.min.css',
      'node_modules/codemirror/lib/codemirror.css',
      'node_modules/codemirror/theme/mbo.css',
      'node_modules/izitoast/dist/css/iziToast.min.css',
      'node_modules/izitoast/dist/js/iziToast.js',
      'css',
      'dist',
      'images',
      'lib',
      'index.html'
    ]

    nodejsProjectSources = [
      'app/lib/platform_helper.js',
      'app/lib/language_mapper.js',
      'app/backend',
      'cordova_main.js',
      'ezra.sqlite',
      'locales'
    ];

    wwwSources.forEach((source) => {
      copy(context.opts.projectRoot, source, 'www');
    });

    nodejsProjectSources.forEach((source) => {
      copy(context.opts.projectRoot, source, 'www/nodejs-project');
    });
}