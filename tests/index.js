const req = require.context('.', false, /.test.js$/);
const files = req.keys();

files.forEach(file => require(file));
