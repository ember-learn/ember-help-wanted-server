const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/typed-ember');


describe('constants/ember-organizations/typed-ember', function() {
  it('We instantiated the class correctly', function() {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      27,
      'There are 27 filters for typed-ember.'
    );
  });
});
