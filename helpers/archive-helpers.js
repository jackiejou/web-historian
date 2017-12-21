var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  publicIndex: path.join(__dirname, '../web/public/index.html'),
  publicLoading: path.join(__dirname, '../web/public/loading.html'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// Worker Only
exports.readListOfUrls = function(callback) {
  // read file
  // parse to array
  // callback(parsedArray)
  fs.readFile(exports.paths.list, (err, data) => {
    callback(data);
  });
};

// Not sure
exports.isUrlInList = function(url, callback) {
};

// Server Only
exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, url + '\n', () => {
    console.log('Appended url!');
  });
};

// Server Only
exports.isUrlArchived = function(url, trueCallback, falseCallback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (files.includes(url + '.html')) {
      trueCallback(url);
    } else {
      falseCallback(url);
    }
  });
  // check if url is in /archives/sites/
  // if it is, trueCallback(url);
};

// Worker
exports.downloadUrls = function(url) {
  request('http://' + url, (error, response, body) => {
    let location = path.join(exports.paths.archivedSites, url + '.html');
    console.log(location);
    fs.writeFile(location, body, () => {
      console.log('Wrote file to', location);
    });
  });


  // https.get('https://' + url, (res) => {
  //   html = '';
  //   res.on('data', chunk => {
  //     html += chunk;
  //   });

  //   res.on('end', () => {
  //     let location = path.join(exports.paths.archivedSites, url + '.html');
  //     console.log(location);
  //     fs.writeFile(location, html, () => {
  //       console.log('Wrote file to', location);
  //     });
  //   });
  // });
};

// Worker
exports.removeFirstUrl = function() {
// WORKER
// string = readFile
// var array = string.split('\n')
// var site = array.shift()
// worker(site)
// var file = array.join('/n');
// writeFile(file)
};
