const { assert } = require('chai');
const { describe, it } = require('mocha');

const getReposWithSupportedLabels = require('../../src/utils/get-repos-with-supported-labels');

describe('utils/get-repos-with-supported-labels', function () {
  describe('getReposWithSupportedLabels', function () {
    it('returns undefined when group name is undefined', function () {
      const reposWithSupportedLabels = getReposWithSupportedLabels();

      assert.isUndefined(reposWithSupportedLabels);
    });

    it('returns undefined when group name is unknown', function () {
      const reposWithSupportedLabels = getReposWithSupportedLabels('foobar');

      assert.isUndefined(reposWithSupportedLabels);
    });

    it('returns a mapping when group name is known', function () {
      const reposWithSupportedLabels = getReposWithSupportedLabels('learning');

      assert.isDefined(reposWithSupportedLabels);
    });
  });
});
