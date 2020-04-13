import * as path from "path";

/**
 * Loads all exported classes from the given directory.
 */
export async function importClassesFromDirectories(directories: string[], formats = [".js", ".ts"]): Promise<Function[]> {

    const loadFileClasses = function (exported: any, allLoaded: Function[]) {
        if (exported instanceof Function) {
            allLoaded.push(exported);

        } else if (exported instanceof Object) {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));

        } else if (exported instanceof Array) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));
        }

        return allLoaded;
    };

    const allFiles = directories.reduce((allDirs, dir) => {

        // Do not glob Network requests
        const glob: string[] = dir.startsWith("https://") ? [dir] : require("glob").sync(path.normalize(dir));

        return allDirs.concat(glob);
    }, [] as string[]);

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