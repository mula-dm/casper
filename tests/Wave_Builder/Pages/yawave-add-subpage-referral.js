/** Wave Builder - SubPages - Referral **/
var args = require('../arguments.json');
var key = "yawave-add-subpage-referral";

if (args[key] !== undefined) {
  var domain = args[key].domain;
  var email = args[key].email;
  var pass = args[key].pass;
  var WaveId = args[key].WaveId;
}

casper.test.begin('Testing functionality adding Benefit Type: Payout Benefits', function (test) {
  casper.start(domain, function () {
    casper.setHttpAuth('ch', 'ch000');
    casper.echo(this.getTitle(), 'INFO');

  });

  /** ===================== Sign Up/In page =========================== **/
  casper.thenOpen(domain + 'user/', function () {
    casper.echo(this.getTitle(), 'INFO');
    test.assertExists('.yawave-signin-form', 'Check if "Sign In" form exists');
    test.assertExists('#edit-name', 'Check if "Email" field exists');
    test.comment('⌚️ Inputting email address in the "Email" field  - ' + email);

    this.fillSelectors('.yawave-signin-form', {
      '.form-item-name input': email
    });

    test.assertExist('#edit-pass', '⌚️ Inputting password in the "Password" field  - ' + pass);
    this.fillSelectors('.yawave-signin-form', {
      '.form-item-pass input': pass
    });

    test.assertExists('.form-submit', 'Check if submit button exists on user login page.');
    this.click('.form-submit');
    test.comment('⌚️ Clicking on button Sign In...');
    casper.waitWhileSelector('.sign-out', function () {
    });

  });

  /** ===================== Wave Builder page =========================== **/
  casper.thenOpen(domain + 'node/' + WaveId + '/plan-modify/pages/*', function () {
    test.comment('⌚️ Opening the Wave page');
    casper.echo(this.getTitle(), 'INFO');
  });

  casper.then(function () {
    test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="pages"]');
    test.comment('⌚️ Clicking on menu Pages');
  });

  casper.then(function () {
    casper.echo(this.getTitle(), 'INFO');
    test.assertExists('[title="Add new page"]', 'Check if "Add Page" the button exists');
    test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.available-pages-list .page-item-wrappernth-child(1) .a');
  });

  casper.then(function () {
    casper.capture('test.png');
  });

  casper.run(function() {
    test.done();
  });
});