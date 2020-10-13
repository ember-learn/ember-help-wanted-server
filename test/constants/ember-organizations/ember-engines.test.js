const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/ember-engines');


describe('constants/ember-organizations/ember-engines', function() {
  it('We instantiated the class correctly', function() {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      21,
      'There are 21 filters for ember-engines.'
    );
  });
});