const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/emberjs');

describe('constants/ember-organizations/adopted-ember-addons', function () {
  it('We instantiated the class correctly', function () {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      159,
      'There are 159 filters for emberjs.'
    );
  });
});
