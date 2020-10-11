const { assert } = require('chai');
const { afterEach, beforeEach, describe, it } = require('mocha');
const nock = require('nock');

const GithubClient = require('../../src/lib/github-client');
const { getGithubClient } = require('../../src/lib/github-client');


describe('lib/github-client', function() {
  beforeEach(function() { 
    nock.disableNetConnect();
  });

  afterEach(function() {
    nock.enableNetConnect();
  });


  describe('GithubClient', function() {
    beforeEach(function() { 
      this.client = new GithubClient({
        supportedOrganizations: [
          'adopted-ember-addons',
          'ember-learn',
        ],

        supportedLabels: [
          'good first issue',
          'hacktoberfest',
          'help wanted',
        ],
      });
    });


    describe('constructor', function() {
      it('receives the supported organizations and labels', function() {
        assert.deepEqual(
          this.client.supportedOrganizations,
          [
            'adopted-ember-addons',
            'ember-learn',
          ],
          'We get the correct supported organizations.'
        );

        assert.deepEqual(
          this.client.supportedLabels,
          [
            'good first issue',
            'hacktoberfest',
            'help wanted',
          ],
          'We get the correct supported labels.'
        );
      });
    });


    describe('buildQuery', function() {
      it('works', function() {
        const expectedQualifiers = [
          'is:open',
          'org:adopted-ember-addons',
          'org:ember-learn',
          'label:"help wanted"',
        ];

        assert.strictEqual(
          this.client.buildQuery('help wanted'),
          expectedQualifiers.join(' '),
          'We get the correct query.'
        );
      });
    });
  });


  describe('getGithubClient', function() {
    it('returns an instance of GithubClient class', function() {
      const client = getGithubClient();

      assert.isDefined(client);

      assert.strictEqual(
        client.supportedOrganizations.length,
        10,
        'We will support 10 organizations when searching GitHub issues.'
      );

      assert.strictEqual(
        client.supportedLabels.length,
        7,
        'We will support 7 labels when searching GitHub issues.'
      );
    });
  });
});