const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/adopted-ember-addons');


describe('constants/ember-organizations/adopted-ember-addons', function() {
  it('We instantiated the class correctly', function() {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      75,
      'There are 75 filters for adopted-ember-addons.'
    );
  });
});