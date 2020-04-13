"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * Loads all exported classes from the given directory.
 */
async function importClassesFromDirectories(directories, formats = [".js", ".ts"]) {
    const loadFileClasses = function (exported, allLoaded) {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        }
        else if (exported instanceof Object) {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
        }
        else if (exported instanceof Array) {
            exported.forEach((i) => loadFileClasses(i, allLoaded));
        }
        return allLoaded;
    };
    const allFiles = directories.reduce((allDirs, dir) => {
        // Do not glob Network requests
        const glob = dir.startsWith("https://") ? [dir] : require("glob").sync(path.normalize(dir));
        return allDirs.concat(glob);
    }, []);
    const dirs = await Promise.all(allFiles
        .filter(file => {
        const dtsExtension = file.substring(file.length - 5, file.length);
        return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== ".d.ts";
    })
        .map(file => {
        // return require(file);
        return import(file);
    }));
    return loadFileClasses(dirs, []);
}
exports.importClassesFromDirectories = importClassesFromDirectories;

//# sourceMappingURL=DirectoryExportedClassesLoader.js.map
