const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/typed-ember');


describe('constants/ember-organizations/typed-ember', function() {
  it('We instantiated the class correctly', function() {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      30,
      'There are 30 filters for typed-ember.'
    );
  });
});