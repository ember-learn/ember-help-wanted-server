const { assert } = require('chai');
const { beforeEach, describe, it } = require('mocha');

const GithubOrganization = require('../../src/classes/github-organization');


describe('classes/github-organization', function() {
  beforeEach(function() {
    this.ember_learn = new GithubOrganization({
      organizationName: 'ember-learn',

      repositoryNames: [
        'cli-guides',
        'guides-source',
        'whats-new-in-emberland',
      ],

      supportedLabels: [
        'december',
        'good first issue',
        'hacktoberfest',
        'help wanted',
      ],
    });
  });


  describe('constructor', function() {
    it('receives the organization name, repository names, and supported labels', function() {
      assert.strictEqual(
        this.ember_learn.organizationName,
        'ember-learn',
        'We get the correct organization name.'
      );

      assert.deepEqual(
        this.ember_learn.repositoryNames,
        [
          'cli-guides',
          'guides-source',
          'whats-new-in-emberland',
        ],
        'We get the correct repository names.'
      );

      assert.deepEqual(
        this.ember_learn.supportedLabels,
        [
          'december',
          'good first issue',
          'hacktoberfest',
          'help wanted',
        ],
        'We get the correct supported labels.'
      );
    });
  });


  describe('getReposWithSupportedLabels', function() {
    it('maps a repo to its supported labels', function() {
      assert.deepEqual(
        this.ember_learn.getReposWithSupportedLabels(),
        [
          { name: 'ember-learn/cli-guides', label: 'december' },
          { name: 'ember-learn/cli-guides', label: 'good first issue' },
          { name: 'ember-learn/cli-guides', label: 'hacktoberfest' },
          { name: 'ember-learn/cli-guides', label: 'help wanted' },
          { name: 'ember-learn/guides-source', label: 'december' },
          { name: 'ember-learn/guides-source', label: 'good first issue' },
          { name: 'ember-learn/guides-source', label: 'hacktoberfest' },
          { name: 'ember-learn/guides-source', label: 'help wanted' },
          { name: 'ember-learn/whats-new-in-emberland', label: 'december' },
          { name: 'ember-learn/whats-new-in-emberland', label: 'good first issue' },
          { name: 'ember-learn/whats-new-in-emberland', label: 'hacktoberfest' },
          { name: 'ember-learn/whats-new-in-emberland', label: 'help wanted' },
        ],
        'We get the correct data structure.'
      );
    });
  });
});