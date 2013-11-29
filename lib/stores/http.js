var request = require('request');
var util = require('util');

module.exports = function(cheat, opts, verbose) {
  var endpoint = opts.endpoint;
  return {
    get: function(command) {
      if(endpoint) {
        return request(util.format(endpoint, command));
      } else if(verbose) {
        console.warn('No endpoint specified !');
      }
    }
  };
};