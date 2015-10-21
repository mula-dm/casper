/** Add benefit type: Payout Benefit **/
var Yawave = require('../../yawave-functions.js');

  casper.test.begin('Testing functionality adding Benefit Type: Payout Benefits', function (test) {
    this.then(function() {
      Yawave.signIn(test);
    });

    this.then(function() {
      Yawave.addPayoutBenefit(test);

    });

    //eachThen();

    casper.run(function () {
      test.done();
      test.pass('Created Benefit Type: Payout Benefit with number - ' + this.fetchText('.benefit-number'));
    });
  });
