var fs = require('fs');
var path = require('path');

module.exports = function(cheat, opts) {
  return {
    get: function(command) {
      var cheatDir = cheat.getUserCheatDir();
      var file = path.join(cheatDir, command);
      var exists = fs.existsSync(file);
      if(exists) {
        return fs.createReadStream(file);
      }
    }
  };
};