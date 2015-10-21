var Yawave = require('../../yawave-functions.js');

var referralLink = 'http://is.gd/unf60X';

casper.test.begin('Testing functionality sign in user through email', function (test) {
  Yawave.signIn(test);

  casper.then(function() {
    casper.thenOpen(referralLink, function() {
      test.comment('Open referral wave');
      test.comment('Clicking on the button "Learn More"');
    });
  });
  casper.then(function() {
    this.click('.referrer-dialog-wrapper .referrer-dialog-content .form-actions a');
  });

  casper.then(function() {
    this.click('.block--idevels-header .idevels-header-main-menu .has-children:last-child a.log-out');
  });

  casper.run(function () {
    test.done();
  });
});
