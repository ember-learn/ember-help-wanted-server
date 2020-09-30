const { assert } = require('chai');
const { describe, it } = require('mocha');

const filterIssues = require('../../src/utils/filter-issues');
const { getRepositoryName } = require('../../src/utils/filter-issues');


describe('utils/filter-issues', function() {
  describe('filterIssues', function() {
    it('returns an empty array when issues is undefined', function() {
      const filteredIssues = filterIssues();

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        []
      );
    });


    it('returns an empty array when groupName is not supported', function() {
      const filteredIssues = filterIssues(
        [], // TODO: Pass a non-empty array
        'foobar'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        []
      );
    });
  });


  describe('getRepositoryName', function() {
    it('returns undefined when repositoryUrl is undefined', function() {
      assert.strictEqual(
        getRepositoryName(),
        undefined
      );
    });


    it('returns organization and repository names when repositoryUrl is passed (1)', function() {
      assert.strictEqual(
        getRepositoryName('https://api.github.com/repos/ember-learn/guides-source'),
        'ember-learn/guides-source'
      );
    });


    it('returns organization and repository names when repositoryUrl is passed (2)', function() {
      assert.strictEqual(
        getRepositoryName('https://api.github.com/repos/emberjs/ember.js'),
        'emberjs/ember.js'
      );
    });
  });
});