const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/empress');


describe('constants/ember-organizations/empress', function() {
  it('We instantiated the class correctly', function() {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      84,
      'There are 84 filters for empress.'
    );
  });
});
