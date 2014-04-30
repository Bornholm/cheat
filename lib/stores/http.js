var request = require('request');
var PassThrough = require('stream').PassThrough;
var util = require('util');
var _ = require('lodash');

module.exports = function(cheat, opts, verbose) {
  var endpoint = opts.endpoint;
  return {
    get: function(command) {
      if(endpoint) {
        var stream = new PassThrough();
        var reqOpts = _.cloneDeep(opts.request || {});
        reqOpts.url = util.format(endpoint, command);
        request(reqOpts).on('response', function(res) {
          var code = res.statusCode;
          var contentType = res.headers['content-type'] || '';
          var isText = contentType.indexOf('text') !== -1;
          if( code >= 200 && code < 400 && isText) {
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
