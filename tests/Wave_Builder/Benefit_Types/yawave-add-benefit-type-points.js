/** Add benefit type: Points **/
var Yawave = require('../../yawave-functions.js');

casper.test.begin('Testing functionality adding Benefit Type: Payout Benefits', function (test) {
  Yawave.signIn(test);
  Yawave.createWave(test);
  Yawave.addPointsBenefit();

  casper.run(function () {
    test.done();
    test.pass('Created Benefit Type: Payout Benefit with number - ' + this.fetchText('.benefit-number'));
  });
});
