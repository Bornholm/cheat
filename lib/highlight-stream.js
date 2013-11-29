var hljs = require('highlight.js');
var util = require('util');
var Transform = require('stream').Transform;

function HighlightStream(options) {
  Transform.call(this, options);
  this.data = [];
};

util.inherits(HighlightStream, Transform);

var p = HighlightStream.prototype;

p._transform = function(chunk, encoding, done) {
  this.data.push(chunk);
  return done();
};

p._flush = function(done) {
  var content = hljs.highlightAuto(this.data.toString()).value;
  this.push(content);
  return done();
};

module.exports = HighlightStream;


