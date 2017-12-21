var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, archive.paths.publicIndex, (data) => {
      res.end(data);
    });
  }
  
  // get url from POST request
  if (req.method === 'POST') {
    url = '';
    req.on('data', chunk => {
      url += chunk;
    });
    req.on('end', () => {
      url = url.split('=')[1];
      console.log('You posted', url);
      archive.isUrlArchived(url, (url) => {
        // true
        // TODO
      }, (url) => {
        // false
        httpHelpers.serveAssets(res, archive.paths.publicLoading, (data) => {
          res.end(data);
        });
        archive.addUrlToList(url);
      });
      // is Url Archived
          // callback: 
            // if present, do x
            // if not present do y
              // callback: 
                // return publicLoading
                // write url to sites file


    });

                     



  }

  

  //res.end(JSON.stringify(archive.paths));
};


// exports.readListOfUrls = function(callback) {
// };

// exports.isUrlInList = function(url, trueCallback, falseCallback) {
// };

// exports.addUrlToList = function(url) {
// };

// exports.isUrlArchived = function(url, callback) {
// };

// exports.downloadUrls = function(url) {
// };
