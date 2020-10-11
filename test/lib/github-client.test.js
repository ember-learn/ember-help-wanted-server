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


    describe('fetchIssuePage', function() {
      it('works', async function() {
        const label = 'help wanted';
        const page = 1;

        const scope = nock('https://api.github.com:443', { encodedQueryParams: true })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery(label),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 1,
          })
          .reply(200, {
            total_count: 3,
            incomplete_results: false,
            // Other attributes have been omitted
            items: [
              {
                id: 607065502,
                html_url: 'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url: 'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url: 'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url: 'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url: 'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url: 'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
            ],
          });

        const response = await this.client.fetchIssuePage({ label, page });

        assert.deepEqual(
          response,
          {
            totalCount: 3,
            issues: [
              {
                id: 607065502,
                html_url: 'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url: 'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url: 'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url: 'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url: 'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url: 'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
            ],
          },
          'We get the correct response.'
        );

        scope.done();
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