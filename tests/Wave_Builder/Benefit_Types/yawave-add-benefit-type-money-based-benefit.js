/** Add benefit type: Money Based Benefit **/
var Yawave = require('../../yawave-functions.js');

casper.test.begin('Testing functionality adding Benefit Type: Payout Benefits', function (test) {
  Yawave.signIn(test);

  casper.then(function () {
    Yawave.addMoneyBenefit(test);
  });

  casper.run(function () {
    test.done();
    test.pass('Created Benefit Type: Money Based Benefit with number - ' + this.fetchText('.benefit-number'));
  });
});
