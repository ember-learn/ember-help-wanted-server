const { assert } = require('chai');
const { describe, it } = require('mocha');

const { getRepo } = require('../../src/utils/filter-issues');


describe('utils/filter-issues', function() {
  describe('getRepo', function() {
    it('returns undefined when repositoryUrl is undefined', function() {
      assert.strictEqual(
        getRepo(),
        undefined
      );
    });


    it('returns organization and repository names when repositoryUrl is passed (1)', function() {
      assert.strictEqual(
        getRepo('https://api.github.com/repos/ember-learn/guides-source'),
        'ember-learn/guides-source'
      );
    });


    it('returns organization and repository names when repositoryUrl is passed (2)', function() {
      assert.strictEqual(
        getRepo('https://api.github.com/repos/emberjs/ember.js'),
        'emberjs/ember.js'
      );
    });
  });
});