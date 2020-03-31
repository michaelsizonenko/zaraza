const yargs = require('yargs');

const argv = yargs
    .option(
        'dir', {
            description: 'directory',
            alias: 'd',
            type: 'string'
        }).option(
        'ext',{
            description: 'extension',
            alias: 'e',
            type: 'string'
        })

    .help()
    .alias('help', 'h')
    .argv;



const fs = require("fs");
const path = require('path');
argv.dir=path.resolve(argv.dir);
const files = fs.readdirSync(argv.dir)
    .filter(x => x.includes(argv.ext))

const res = files.map(file =>`export { default as ${file.split('.png')[0]} } from './${file}';`)
    .join('\n');

fs.writeFileSync(argv.dir+"/index.js", res);
