var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var async = require('async');
var defaultConfig = require('../default-config');

var DEFAULT_STORES = {
  'http': './stores/http',
  'local': './stores/local'
};

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

exports.loadStore = function(module, options, verbose) {
  if(module in DEFAULT_STORES) {
    module = DEFAULT_STORES[module];
  }
  return require(module)(exports, options || {}, verbose);
};

exports.loadAllStores = function(stores, verbose) {
  return stores.reduce(function(result, storeConf) {
    if(storeConf) {
      var module = storeConf.module;
      var options = storeConf.options;
      if(module) {
        try {
          if(verbose) console.log('Loading store', module);
          var store = exports.loadStore(module, options, verbose);
          result.push(store);
        } catch(err) {
          if(verbose) {
            console.error("Error while loading store " + module, err);
          }
        }
      }
    }
    return result;
  }, []);
};