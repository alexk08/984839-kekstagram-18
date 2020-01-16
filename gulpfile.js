"use strict";

const ghPages = require('gh-pages');
const path = require('path');

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './'), cb);
}
exports.deploy = deploy;
