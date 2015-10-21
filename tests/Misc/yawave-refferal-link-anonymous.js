/* Open wave */
var referralLink = 'http://is.gd/unf60X';

//var globals = [];

//if (typeof casper.cli.args[0] !== 'undefined') {
//  casper.echo('Need arguments in console line: casperjs test filename.js referralLink').exit(1);
//} else {
// globals.referralLink = casper.cli.args[0];
//}


casper.test.begin('Testing of referral wave functionality', function(test) {
  casper.start(referralLink, function() {
    test.comment('Authorization pop-up opening on the site');
    casper.setHttpAuth('ch', 'ch000');
    casper.userAgent("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16");
  });


  casper.thenOpen(referralLink, function() {
    test.comment('Open referral wave');
  });

  casper.then(function() {
    this.click('.referrer-dialog-wrapper .referrer-dialog-content .form-actions a');
    test.comment('Clicking on the button "Learn More"');
  });

  casper.run(function() {
    test.done();
  });
});

