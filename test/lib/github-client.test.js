const { assert } = require('chai');
const { afterEach, beforeEach, describe, it } = require('mocha');
const nock = require('nock');

const GithubClient = require('../../src/lib/github-client');
const { getGithubClient } = require('../../src/lib/github-client');

describe('lib/github-client', function () {
  beforeEach(function () {
    nock.disableNetConnect();
  });

  afterEach(function () {
    nock.enableNetConnect();
  });

  describe('GithubClient', function () {
    beforeEach(function () {
      this.client = new GithubClient({
        supportedOrganizations: ['adopted-ember-addons', 'ember-learn'],

        supportedLabels: ['good first issue', 'hacktoberfest', 'help wanted'],
      });
    });

    describe('constructor', function () {
      it('receives the supported organizations and labels', function () {
        assert.deepEqual(
          this.client.supportedOrganizations,
          ['adopted-ember-addons', 'ember-learn'],
          'We get the correct supported organizations.'
        );

        assert.deepEqual(
          this.client.supportedLabels,
          ['good first issue', 'hacktoberfest', 'help wanted'],
          'We get the correct supported labels.'
        );
      });
    });

    describe('buildQuery', function () {
      it('works', function () {
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

    describe('fetchIssuePage', function () {
      it('works', async function () {
        const label = 'help wanted';
        const page = 1;

        const scope = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
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
                html_url:
                  'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url:
                  'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url:
                  'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url:
                  'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
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
                html_url:
                  'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url:
                  'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url:
                  'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url:
                  'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
            ],
          },
          'We get the correct response.'
        );

        scope.done();
      });
    });

    describe('fetchAllRepos', function () {
      it('works', async function () {
        const scope = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/repositories')
          .query({
            q: 'user:ember-learn+NOT+builds+NOT+statusboard+help-wanted-issues:>0+archived:false',
          })
          .reply(200, {
            total_count: 3,
            incomplete_results: false,
            // Other attributes have been omitted
            items: [
              {
                id: 44704884,
                full_name: 'adopted-ember-addons/ember-keyboard',
              },
              {
                id: 135148684,
                full_name: 'ember-learn/ember-website',
              },
              {
                id: 47560189,
                full_name: 'ember-learn/ember-api-docs',
              },
            ],
          });

        const response = await this.client.fetchAllRepos();

        assert.deepEqual(
          response,
          {
            totalCount: 3,
            repos: [
              {
                id: 44704884,
                full_name: 'adopted-ember-addons/ember-keyboard',
              },
              {
                id: 135148684,
                full_name: 'ember-learn/ember-website',
              },
              {
                id: 47560189,
                full_name: 'ember-learn/ember-api-docs',
              },
            ],
          },
          'We get the correct response.'
        );

        scope.done();
      });
    });

    describe('fetchIssuesWithLabel', function () {
      it('works', async function () {
        const label = 'help wanted';

        const scope_page1 = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery(label),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 1,
          })
          .reply(200, {
            // Set `total_count` to be greater than `PAGE_SIZE` (100)
            total_count: 102,
            incomplete_results: false,
            // Other attributes have been omitted
            items: [
              {
                id: 607065502,
                html_url:
                  'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url:
                  'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url:
                  'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url:
                  'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
              // ... 97 more items have been skipped
            ],
          });

        const scope_page2 = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery(label),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 2,
          })
          .reply(200, {
            total_count: 102,
            incomplete_results: false,
            items: [
              {
                id: 709835113,
                html_url:
                  'https://github.com/ember-learn/upgrade-guide/issues/48',
                repository_url:
                  'https://api.github.com/repos/ember-learn/upgrade-guide',
                title: 'Separate form and search results (Part 1 of 2)',
              },
              {
                id: 718488361,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/163',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 4 of 4)',
              },
            ],
          });

        const response = await this.client.fetchIssuesWithLabel(label);

        assert.deepEqual(
          response,
          [
            {
              id: 607065502,
              html_url:
                'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
              repository_url:
                'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
              title: 'Review and improve Testing documentation',
            },
            {
              id: 718487975,
              html_url:
                'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
              repository_url:
                'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
              title: 'Add links for learning more (Part 2 of 4)',
            },
            {
              id: 718620203,
              html_url:
                'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
              repository_url:
                'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
              title: 'Allow the user to change their preferred language',
            },
            {
              id: 709835113,
              html_url:
                'https://github.com/ember-learn/upgrade-guide/issues/48',
              repository_url:
                'https://api.github.com/repos/ember-learn/upgrade-guide',
              title: 'Separate form and search results (Part 1 of 2)',
            },
            {
              id: 718488361,
              html_url:
                'https://github.com/ember-learn/super-rentals-tutorial/issues/163',
              repository_url:
                'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
              title: 'Add links for learning more (Part 4 of 4)',
            },
          ],
          'We get the correct response.'
        );

        scope_page1.done();
        scope_page2.done();
      });
    });

    describe('fetchAllIssues', function () {
      it('works', async function () {
        const scope_good_first_issue_page1 = nock(
          'https://api.github.com:443',
          { encodedQueryParams: true }
        )
          .get('/search/issues')
          .query({
            q: this.client.buildQuery('good first issue'),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 1,
          })
          .reply(200, {
            total_count: 2,
            incomplete_results: false,
            items: [
              {
                id: 608455034,
                html_url:
                  'https://github.com/adopted-ember-addons/ember-keyboard/issues/123',
                repository_url:
                  'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title:
                  'Use ember-addon-docs or similar to provide versioned documentation',
              },
              // Test duplicate issue
              {
                id: 718620203,
                html_url:
                  'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url:
                  'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
            ],
          });

        const scope_hacktoberfest_page1 = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery('hacktoberfest'),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 1,
          })
          .reply(200, {
            total_count: 0,
            incomplete_results: false,
            items: [],
          });

        const scope_help_wanted_page1 = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery('help wanted'),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 1,
          })
          .reply(200, {
            total_count: 102,
            incomplete_results: false,
            items: [
              {
                id: 607065502,
                html_url:
                  'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
                repository_url:
                  'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
                title: 'Review and improve Testing documentation',
              },
              {
                id: 718487975,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 2 of 4)',
              },
              {
                id: 718620203,
                html_url:
                  'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
                repository_url:
                  'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
                title: 'Allow the user to change their preferred language',
              },
              // ... 97 more items have been skipped
            ],
          });

        const scope_help_wanted_page2 = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/search/issues')
          .query({
            q: this.client.buildQuery('help wanted'),
            sort: 'updated',
            order: 'desc',
            per_page: 100,
            page: 2,
          })
          .reply(200, {
            total_count: 102,
            incomplete_results: false,
            items: [
              {
                id: 709835113,
                html_url:
                  'https://github.com/ember-learn/upgrade-guide/issues/48',
                repository_url:
                  'https://api.github.com/repos/ember-learn/upgrade-guide',
                title: 'Separate form and search results (Part 1 of 2)',
              },
              {
                id: 718488361,
                html_url:
                  'https://github.com/ember-learn/super-rentals-tutorial/issues/163',
                repository_url:
                  'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
                title: 'Add links for learning more (Part 4 of 4)',
              },
            ],
          });

        const response = await this.client.fetchAllIssues();

        assert.deepEqual(
          response,
          [
            {
              id: 608455034,
              html_url:
                'https://github.com/adopted-ember-addons/ember-keyboard/issues/123',
              repository_url:
                'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
              title:
                'Use ember-addon-docs or similar to provide versioned documentation',
            },
            {
              id: 718620203,
              html_url:
                'https://github.com/ember-learn/ember-octane-vs-classic-cheat-sheet/issues/63',
              repository_url:
                'https://api.github.com/repos/ember-learn/ember-octane-vs-classic-cheat-sheet',
              title: 'Allow the user to change their preferred language',
            },
            {
              id: 607065502,
              html_url:
                'https://github.com/adopted-ember-addons/ember-keyboard/issues/121',
              repository_url:
                'https://api.github.com/repos/adopted-ember-addons/ember-keyboard',
              title: 'Review and improve Testing documentation',
            },
            {
              id: 718487975,
              html_url:
                'https://github.com/ember-learn/super-rentals-tutorial/issues/161',
              repository_url:
                'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
              title: 'Add links for learning more (Part 2 of 4)',
            },
            {
              id: 709835113,
              html_url:
                'https://github.com/ember-learn/upgrade-guide/issues/48',
              repository_url:
                'https://api.github.com/repos/ember-learn/upgrade-guide',
              title: 'Separate form and search results (Part 1 of 2)',
            },
            {
              id: 718488361,
              html_url:
                'https://github.com/ember-learn/super-rentals-tutorial/issues/163',
              repository_url:
                'https://api.github.com/repos/ember-learn/super-rentals-tutorial',
              title: 'Add links for learning more (Part 4 of 4)',
            },
          ],
          'We get the correct response.'
        );

        scope_good_first_issue_page1.done();
        scope_hacktoberfest_page1.done();
        scope_help_wanted_page1.done();
        scope_help_wanted_page2.done();
      });
    });

    describe('getRateLimit', function () {
      it('works', async function () {
        const scope = nock('https://api.github.com:443', {
          encodedQueryParams: true,
        })
          .get('/rate_limit')
          .reply(200, {
            // Other attributes omitted
            resources: {
              core: {
                limit: 5000,
                used: 5,
                remaining: 4995,
                reset: 1602454624,
              },
              search: { limit: 30, used: 16, remaining: 14, reset: 1602451712 },
              graphql: {
                limit: 5000,
                used: 1,
                remaining: 4999,
                reset: 1602451896,
              },
              integration_manifest: {
                limit: 5000,
                used: 0,
                remaining: 5000,
                reset: 1602455281,
              },
              source_import: {
                limit: 100,
                used: 0,
                remaining: 100,
                reset: 1602451741,
              },
              code_scanning_upload: {
                limit: 500,
                used: 0,
                remaining: 500,
                reset: 1602455281,
              },
            },
          });

        const response = await this.client.getRateLimit();

        assert.deepEqual(
          response,
          {
            limit: 5000,
            used: 5,
            remaining: 4995,
            reset: 1602454624,
          },
          'We get the correct response.'
        );

        scope.done();
      });
    });
  });

  describe('getGithubClient', function () {
    it('returns an instance of GithubClient class', function () {
      const client = getGithubClient();

      assert.isDefined(client);

      assert.ok(
        client.supportedOrganizations.length > 0,
        'We support organizations when searching GitHub issues.'
      );

      assert.ok(
        client.supportedLabels.length > 0,
        'We support labels when searching GitHub issues.'
      );
    });
  });
});
