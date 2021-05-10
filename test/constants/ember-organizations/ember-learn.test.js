const { assert } = require('chai');
const { describe, it } = require('mocha');

const reposWithSupportedLabels = require('../../../src/constants/ember-organizations/ember-learn');

describe('constants/ember-organizations/adopted-ember-addons', function () {
  it('We instantiated the class correctly', function () {
    assert.strictEqual(
      reposWithSupportedLabels.length,
      272,
      'There are 272 filters for ember-learn.'
    );
  });
});
