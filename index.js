var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
    module.exports = require('./dist/cjs/rdform.min.js');
} else {
    module.exports = require('./dist/cjs/rdform.js');
}