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


    it('returns an empty array when there are no help wanted issues', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'typed-ember'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        []
      );
    });


    it('filters issues when groupName matches an organization name (1)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'ember-learn'
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


    it('filters issues when groupName matches an organization name (2)', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'emberjs'
      );

      assert.deepEqual(
        filteredIssues.map(({ url }) => url),
        [
          'https://api.github.com/repos/emberjs/ember-inspector/issues/947',
        ]
      );
    });


    it('filters issues when groupName matches a custom category', function() {
      const filteredIssues = filterIssues(
        issuesFixture,
        'RFCs'
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