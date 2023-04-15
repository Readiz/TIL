const glob = require('glob-promise');
const fse = require('fs-extra');

const writeFileSync = (filepath, str) => {
    try {
        fse.outputFile(filepath, str);
    } catch (e) {
        console.error('Writing Error', filepath);
    }
}

console.log('Starting...');
(async () => {
    let paths = await glob.promise('./src/*.md', {});
    paths = paths.map(item => encodeURI(item));
    console.log(paths);
    writeFileSync('./list.json', JSON.stringify(paths, null, 2));
    writeFileSync('./lastUpdated.txt', String(new Date()));
})();
