// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var CronJob = require('cron').CronJob;

// every minute, do the following steps
new CronJob('*/1 * * * *', function() {
  // get urls from file
  archive.readListOfUrls((data, callback) => {
    data = data + '';
    let array = data.split('\n');
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      let url = array[i];
      if (url) {
        archive.downloadUrls(url);
      }
    }
    fs.writeFile(archive.paths.list, '', () => {
      console.log(archive.paths.list, 'WIPED');
    });
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
