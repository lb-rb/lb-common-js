var jsdom = require('jsdom');
var { JSDOM } = jsdom;

function createDocument () {
  var html = "<!doctype html><html><body></body></html>";
  var { document } = (new JSDOM(html)).window;
  return document;
}

module.exports = createDocument;
