var Yawave = require('../yawave-functions.js');
var domain = 'http://dev02.yawave.com';

casper.test.begin('Testing of creating wave functionality', function (test) {

  //For Changes user-email and pass need use file arguments.json
  Yawave.signIn(test);

  casper.then(function() {
    casper.thenOpen(domain + '/discover', function () {
      this.click('.idevels-discover-filters-form .views-result .view-list-of-campaigns-new .view-content .views-row-1 .views-field-field-page-dialog-url-1 a');
    });

    this.then(function() {
      test.comment('Click on the button "Refer a Friend"');
      this.click('.wave-builder-item .referral-teaser-wrapper .action-button .refer-friend a');
    });

    this.then(function() {
      test.comment('Open pop-up "Refer a Friend"');
      casper.waitForSelector('.referrer-dialog-wrapper', function () {
        //this.click('.referrer-dialog-blocks .referrer-dialog-social-block .sharing-channels-list li:nth-child(3) a');
      });
    });
    this.then(function() {
    });

  });

  casper.run(function () {
    test.done();
  });
});
