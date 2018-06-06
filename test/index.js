"use strict";

var test = require("tape");

var common = require("../");
var createDOM = require("./fixtures/create-dom.js");

var rawast = 'JSON{&amp;quot;ast&amp;quot;:[[&amp;quot;field&amp;quot;,[&amp;quot;test&amp;quot;,&amp;quot;text_field&amp;quot;,null,[],[&amp;quot;object&amp;quot;,[[&amp;quot;label&amp;quot;,[&amp;quot;value&amp;quot;,[&amp;quot;Test&amp;quot;]]]]]]]],&amp;quot;csrfToken&amp;quot;:&amp;quot;sometoken&amp;quot;}';

test("should return string for string", function (assert) {
  global.document = createDOM();
  var expected = JSON.stringify({
    ast: [ [ 'field', [ 'test', 'text_field', null, [], [ 'object', [ ['label', ['value', ['Test']]]] ] ] ] ],
    csrfToken: 'sometoken' 
  })
  var json = common.parseFormProps(common.decodeHTML(rawast));
  var decoded = common.deepDecodeHTML(json);
  assert.equal(JSON.stringify(decoded), expected);
  assert.end();
});
