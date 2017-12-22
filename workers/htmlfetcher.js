// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var CronJob = require('cron').CronJob;
var path = require('path');
// every minute, do the following steps
new CronJob('*/1 * * * *', function() {
  // get urls from file

  return archive.readListOfUrlsAsync()
    .then(data => {
      data = data + '';
      let array = data.split('\n');
      array.pop();
      return Promise.all(array.map(archive.downloadUrlsAsync));
    })
    .then(arrayOfArrays => {
      console.log('hey jackie');
      arrayOfArrays.forEach(array => {
        console.log('a');
        archive.writeToFileAsync(path.join(archive.paths.archivedSites, (array[0] + '.html')), array[1]);
      });
    })
    .then(() => {
      console.log('WOWOWWOWOW');
      archive.writeToFileAsync(archive.paths.list, '');
    })
    .catch(err => {
      console.log('something broke');
    });
  // readListOfUrls
    // callback
      // convert to array
      // for each url in array
      // downloadUrls
        // ajax GET
          // callback
            // save to /archives/sites/
      // wipe file  
}, null, true, 'America/Los_Angeles');


// return archive.readListOfUrlsAsync()
//   .then(data => {
//     data = data + '';
//     let array = data.split('\n');
//     return array.map(archive.downloadUrlsAsync);
//   })
//   .then(arrayOfArrays => {
//     console.log(arrayOfArrays);
//     arrayOfArrays.forEach(array => {
//       archive.writeToFileAsync(array[0], array[1]);
//     });
//   })
//   .then(() => {
//     console.log("WOWOWWOWOW");
//     archive.writeToFileAsync(archive.paths.list, '');
//   })
//   .catch(err => {
//     console.log('something broke');
//   });