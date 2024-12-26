const fs = require('fs');
const path = require('path');

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