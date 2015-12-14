const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const COMPONENTS_DIR = './src/components';

const name = args[0];
const dirPath = path.join(COMPONENTS_DIR, name);

function jsTemplate(name) {
  return (
`const React = require('react');

const ${name} = React.createClass({
  render: function () {
    return (<div className="${name.toLowerCase()}">
    </div>);
  }
});

module.exports = ${name};
`);
}

function cssTemplate(name) {
  return (
`.${name.toLowerCase()} {

}
`);
}

if (fs.existsSync(dirPath)) throw new Error(`Component "${name}" already exists`);

fs.mkdirSync(dirPath);
fs.writeFileSync(path.join(dirPath, name + '.js'), jsTemplate(name));
fs.writeFileSync(path.join(dirPath, name + '.scss'), cssTemplate(name));
