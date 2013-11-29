var colors = require('colors');
var util = require('util');
var Transform = require('stream').Transform;

var LINEBREAK = '\n';

function HighlightStream(options) {
  options = options || {};
  Transform.call(this, options);
  this.line = '';
  this.color = options.color;
  this.style = options.style;
};

util.inherits(HighlightStream, Transform);

var p = HighlightStream.prototype;

p._transform = function(chunk, encoding, done) {
  var str = chunk.toString();
  var lineBreak;
  while((lineBreak = str.indexOf(LINEBREAK)) !== -1) {
    this.line += str.slice(0, lineBreak) + '\n';
    this.push(this._colorize(this.line));
    this.line = '';
    str = str.slice(lineBreak+1);
  }
  this.line += str;
  return done();
};

p._colorize = function(line) {
  var sharp = line.indexOf('#');
  if(sharp !== -1) {
    var comment = line.slice(sharp);
    if(this.color) comment = comment[this.color];
    if(this.style) comment = comment[this.style];
    line = line.slice(0, sharp) + comment;
  }
  return line;
};

module.exports = HighlightStream;


