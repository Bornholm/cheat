var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var async = require('async');
var defaultConfig = require('../default-config');

exports.getUserHome = function() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

exports.getUserCheatDir = function() {
  var userHome = exports.getUserHome();
  return path.join(userHome, '.cheat');
};

exports.getUserConfigFile = function() {
  var cheatDir = exports.getUserCheatDir();
  return path.join(cheatDir, 'config.json');
};

exports.ensureUserConfig = function() {
  var cheatDir = exports.getUserCheatDir();
  var configPath = exports.getUserConfigFile();
  mkdirp.sync(cheatDir);
  var exists = fs.existsSync(configPath);
  if(!exists) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  }
  return exports;
};

exports.loadStore = function(path, options) {
  var module = require(path);
  return module(options); 
};