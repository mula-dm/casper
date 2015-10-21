/** Add benefit type: Benefit to give **/
var args = require('../arguments.json');
var key = "yawave-add-benefit-type-benefit-to-give";

if (args[key] !== undefined) {
  var domain = args[key].domain;
  var email = args[key].email;
  var pass = args[key].pass;
  var WaveId = args[key].WaveId;
  var AmountType = args[key].AmountType;
  var AmountPerEvent = args[key].AmountPerEvent;
  var MonetaryEquivalent = args[key].MonetaryEquivalent;
  var DeliveryInterval = args[key].DeliveryInterval;
  var LastDeliveryPoint = args[key].LastDeliveryPoint;
  var LeftBenefitCondition = args[key].LeftBenefitCondition;
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
    test.comment('Opening the wave page');
    casper.echo(this.getTitle(), 'INFO');
  });

  casper.then(function () {
    test.assertExists('.menu-benefits-children-title', 'Check if "Benefit Type" the title exists');
    this.click('[data-id="benefits"]');
    test.comment('⌚️ Clicking on menu Benefit');
  });

  /** --------------------- Benefit type templates page --------------------- **/
  casper.then(function () {
    test.assertExists('[title="Add benefit widget"]', 'Check if "Add Benefit" the button exists');
    test.comment('⌚️ Clicking on button Add Benefit');
    this.click('.idevels-widget-benefit-form .fields-actions a.add-field');

  });

  casper.then(function () {
    this.fetchText('.field-group-div h3');
    test.assertExists('#widget-element-benefit-to-give', 'Check if the "Benefit to give" type exists');
    this.click('#widget-add-benefit-to-give > div > a');
    test.comment('⌚️ Clicking on Benefit type - Benefit to give');

  });

  /** --------------------- Benefit to give page --------------------- **/
  casper.then(function () {
    this.click('.add .yawave-widget-add-child-benefit-type');
    this.wait(5000, function() {
    });
  });
  casper.then(function() {
    casper.fillSelectors('.idevels-widget-entity-form', {
      //'[id^=yw_select_benefittype]': '[data-type="PERCENTAGE_BASED_COUPON"]'
    });
    casper.fillSelectors('.idevels-widget-entity-form', {
      '[id^=yw_select_amounttype]': AmountType
      /*'[id^=yw_textbox_amount_per_event': AmountPerEvent,
      '[id^=yw_textbox_monetary_equivalent]': MonetaryEquivalent*/
    });
    this.click('.form-actions .page-submit-button');
    this.wait(5000, function() {
    });
  });

  casper.then(function () {
    //test.comment('Fill fields on block - Terms & Conditions');
    casper.fillSelectors('.idevels-widget-entity-form', {

      /** --------- Term & Conditions --------- **/
      //Max. Amount per Beneficiary
      //TODO - Add click on the switch-wrapper and after fill the numbers
      //'[id^=yw_textbox_maxamount_]': '1000', //value : only numbers

      /** -------------- Delivery Form ---------------- **/
      //Delivery interval
      '[id^=yw_select_deliveryinterval_]': DeliveryInterval,

      //Last delivery point in time after wave ending
      '[id^=yw_select_last_delivery_point_]': LastDeliveryPoint,

      //If Benefit in no Wallet left
      '[id^=yw_select_leftbenefitcondition_]': LeftBenefitCondition
    });
    this.click('.page-submit-button');
    this.test.comment('⌚️  Saving add benefit...');
  });

  casper.then(function () {
    casper.waitWhileSelector('.node-wave-secondary-menu', function () {
    });
  });

  casper.then(function () {
    //casper.echo(this.getElementInfo('.benefit-number'));
  });

  casper.run(function () {
    test.done();
    test.pass('Created Benefit Type: Payout Benefit with number - ' + this.fetchText('.benefit-number'));
  });
});
