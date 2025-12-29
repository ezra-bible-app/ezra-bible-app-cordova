const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

module.exports = function(context) {
    // Only run for iOS
    if (!context.opts.platforms.includes('ios')) {
        return;
    }

    const projectRoot = context.opts.projectRoot;
    const platformPath = path.join(projectRoot, 'platforms', 'ios');
    
    // Find the .xcodeproj directory
    const projectDir = fs.readdirSync(platformPath).find(item => item.endsWith('.xcodeproj'));
    if (!projectDir) {
        console.error('Could not find .xcodeproj in ' + platformPath);
        return;
    }
    
    const projectPath = path.join(platformPath, projectDir, 'project.pbxproj');
    const myProj = xcode.project(projectPath);

    return new Promise((resolve, reject) => {
        myProj.parse(function(err) {
            if (err) {
                reject(err);
                return;
            }

            const buildPhaseName = 'Cleanup Sword Build';
            
            // Check if build phase already exists to avoid duplicates
            const buildPhases = myProj.hash.project.objects.PBXShellScriptBuildPhase;
            if (buildPhases) {
                for (const key in buildPhases) {
                    if (buildPhases[key].comment === buildPhaseName) {
                        // console.log('Build phase "' + buildPhaseName + '" already exists.');
                        resolve();
                        return;
                    }
                }
            }

            // Script to delete the folder from the app bundle
            // $CODESIGNING_FOLDER_PATH points to the .app bundle
            const script = `
            rm -rf "$CODESIGNING_FOLDER_PATH/www/nodejs-project/node_modules/node-sword-interface/sword_build"
            rm -rf "$CODESIGNING_FOLDER_PATH/www/nodejs-project/node_modules/node-sword-interface/sword"
            rm -rf "$CODESIGNING_FOLDER_PATH/www/nodejs-project/node_modules/node-sword-interface/src"
            `;
            
            const options = {
                shellPath: '/bin/sh',
                shellScript: script
            };

            // Add the build phase to the first target
            const targetUUID = myProj.getFirstTarget().uuid;
            myProj.addBuildPhase([], 'PBXShellScriptBuildPhase', buildPhaseName, targetUUID, options);

            fs.writeFileSync(projectPath, myProj.writeSync());
            console.log('Added iOS build phase: ' + buildPhaseName);
            resolve();
        });
    });
};