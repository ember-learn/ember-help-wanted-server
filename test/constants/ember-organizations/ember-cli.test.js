const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/ember-cli');

describe('constants/ember-organizations/adopted-ember-addons', function () {
  it('We instantiated the class correctly', function () {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      315,
      'There are 315 filters for ember-cli.'
    );
  });
});
