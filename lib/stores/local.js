var fs = require('fs');
var path = require('path');

module.exports = function(cheat, opts) {
  var cheatDir = opts.dir || cheat.getUserCheatDir();
  return {
    get: function(command) {
      var file = path.join(cheatDir, command);
      var exists = fs.existsSync(file);
      if(exists) {
        return fs.createReadStream(file);
      }
    }
  };
};