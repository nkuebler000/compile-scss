const sass = require('sass');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

try {
  const path = argv.path;
  let renderOpts = {
    file: path
  };
  if (argv.mode === 'production') {
    renderOpts.outputStyle = 'compressed';
  }
  const result = sass.renderSync(renderOpts);
  console.log(result.stats);
  if (result.css) {
    const dir = `${__dirname}/dist/assets/css`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const pathSegments = path.split('/');
    fs.writeFileSync(`${dir}/${pathSegments[pathSegments.length-1].replace('.scss', '.css')}`, result.css);
  }
} catch (error) {
  console.log(error);
}