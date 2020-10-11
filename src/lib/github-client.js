const _ = require('lodash');
const octokit = require('@octokit/rest')();

const { orgs, labels } = require('../config');
const getEnv = require('../environment');

const API_TOKEN = getEnv('GITHUB_API_TOKEN', 'fake_token_for_testing');
const NUM_ISSUES_PER_PAGE = 100; // Github's max is 100
const MAX_PAGE_COUNT = 10; // Github's max record depth is 1000


class GithubClient {
  constructor({
    supportedOrganizations = [],
    supportedLabels = [],
  }) {
    this.supportedOrganizations = supportedOrganizations;
    this.supportedLabels = supportedLabels;

    this.api = octokit;
    this.api.authenticate({
      type: 'token',
      token: API_TOKEN
    });
  }


  buildQuery(label) {
    const orgs = this.supportedOrganizations;

    const qualifiers = [
      'is:open',
      ...orgs.map(org => `org:${org}`),
      `label:"${label}"`,
    ];

    return qualifiers.join(' ');
  }


  async fetchIssuePage({ label, page }) {
    const query = this.buildQuery(label);
  
    const { data } = await octokit.search.issues({
      q: query,
      sort: 'updated',
      order: 'desc',
      per_page: NUM_ISSUES_PER_PAGE,
      page,
    });

    return {
      totalCount: data.total_count,
      issues: data.items,
    };
  }


  /*
    TODO:

    I think this method isn't needed because the search results
    are specific to the `ember-learn` organization.

    Consider removing this method, the corresponding API endpoint,
    and the cache.
  */
  async fetchAllRepos() {
    const query = 'user:ember-learn+NOT+builds+NOT+statusboard+help-wanted-issues:>0+archived:false'

    const { data } = await octokit.search.repos({
      q: query,
    });

    return {
      totalCount: data.total_count,
      repos: data.items,
    };
  }


  async fetchIssuesWithLabel(label) {
    const allIssues = [];

    let doMoreIssuesExist = true;
    let doMorePagesExist = true;
    let page = 1;

    while (doMoreIssuesExist && doMorePagesExist) {
      const { totalCount, issues } = await this.fetchIssuePage({ label, page });
      allIssues.push(issues);

      doMoreIssuesExist = totalCount > (page * NUM_ISSUES_PER_PAGE);
      doMorePagesExist = page < MAX_PAGE_COUNT;
      page++;
    }
  
    return allIssues;
  }


  async fetchIssueSet() {
    const promises = labels.map(async (label) => {
      return this.fetchIssuesWithLabel(label);
    });
    let results = await Promise.all(promises);

    return _.uniqWith(_.flattenDeep(results), (a, b) => {
      return a.id === b.id;
    });
  }

  async getRateLimit() {
    return await this.api.misc.getRateLimit({});
  }
}


// Create the GitHub client once in the app
let client;

function getGithubClient() {
  if (client) {
    return client;
  }

  client = new GithubClient({
    supportedOrganizations: orgs,
    supportedLabels: labels,
  });

  return client;
}

module.exports = GithubClient;
module.exports.getGithubClient = getGithubClient;