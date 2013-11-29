var request = require('request');
var PassThrough = require('stream').PassThrough;
var util = require('util');

module.exports = function(cheat, opts, verbose) {
  var endpoint = opts.endpoint;
  return {
    get: function(command) {
      if(endpoint) {
        var stream = new PassThrough();
        var reqOpts = Object.create(opts.request || {});
        reqOpts.url = util.format(endpoint, command);
        request(reqOpts).on('response', function(res) {
          if(res.statusCode >= 200 && res.statusCode < 400) {
            return res.pipe(stream);
          } else {
            return stream.end();
          }
        });
        return stream;
      } else if(verbose) {
        console.warn('No endpoint specified !');
      }
    }
  };
};