const { assert } = require('chai');
const { describe, it } = require('mocha');

const filterIssues = require('../../src/utils/filter-issues');
const { getRepositoryName } = require('../../src/utils/filter-issues');
const issuesFixture = require('../fixtures/issues');


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
        issuesFixture,
        'foobar'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        []
      );
    });


    it('returns an empty array when groupName is supported by there are no matching issues', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'emberHelpWanted'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        []
      );
    });


    it('filters issues when groupName is provided (1)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'community'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/ember-cli/ember-twiddle/issues/725',
          'https://api.github.com/repos/ember-cli/ember-twiddle/issues/108',
        ]
      );
    });


    it('filters issues when groupName is provided (2)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'core'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/ember-cli/ember-cli/issues/6713',
          'https://api.github.com/repos/emberjs/ember-inspector/issues/947',
          'https://api.github.com/repos/emberjs/data/issues/5969',
          'https://api.github.com/repos/ember-cli/ember-cli/issues/7505',
        ]
      );
    });


    it('filters issues when groupName is provided (3)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'learning'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/ember-learn/tutorials/issues/1',
          'https://api.github.com/repos/ember-learn/deprecation-app/issues/80',
          'https://api.github.com/repos/ember-learn/deprecation-app/issues/75',
          'https://api.github.com/repos/ember-learn/guides-source/issues/1421',
          'https://api.github.com/repos/ember-learn/guides-source/issues/1539',
          'https://api.github.com/repos/ember-learn/guides-source/issues/1440',
        ]
      );
    });


    it('filters issues when groupName is provided (4)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'rfcs'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/emberjs/rfcs/issues/642',
          'https://api.github.com/repos/emberjs/rfcs/issues/360',
          'https://api.github.com/repos/emberjs/rfcs/issues/426',
        ]
      );
    });


    it('filters issues when groupName is provided (5)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'octane'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/ember-learn/guides-source/issues/1539',
        ]
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