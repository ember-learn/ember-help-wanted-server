const { Octokit } = require('@octokit/rest');
const { orgs, labels } = require('../config');
const getEnv = require('../environment');

const API_TOKEN = getEnv('GITHUB_API_TOKEN', 'fake_token_for_testing');
const NUM_ISSUES_PER_PAGE = 100; // Github's max is 100
const MAX_PAGE_COUNT = 10; // Github's max record depth is 1000

class GithubClient {
  constructor({ supportedOrganizations = [], supportedLabels = [] }) {
    this.supportedOrganizations = supportedOrganizations;
    this.supportedLabels = supportedLabels;

    this.octokit = new Octokit({
      auth: API_TOKEN,
    });
  }

  buildQuery(label) {
    const orgs = this.supportedOrganizations;

    const qualifiers = [
      'is:open',
      ...orgs.map((org) => `org:${org}`),
      `label:"${label}"`,
    ];

    return qualifiers.join(' ');
  }

  async fetchIssuePage({ label, page }) {
    const query = this.buildQuery(label);

    const { data } = await this.octokit.search.issuesAndPullRequests({
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
    const query =
      'user:ember-learn+NOT+builds+NOT+statusboard+help-wanted-issues:>0+archived:false';

    const { data } = await this.octokit.search.repos({
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
      allIssues.push(...issues);

      doMoreIssuesExist = totalCount > page * NUM_ISSUES_PER_PAGE;
      doMorePagesExist = page < MAX_PAGE_COUNT;
      page++;
    }

    return allIssues;
  }

  async fetchAllIssues() {
    const fetchRequests = this.supportedLabels.map((label) => {
      return this.fetchIssuesWithLabel(label);
    });

    const results = await Promise.allSettled(fetchRequests);

    /*
      An issue may appear more than once in `responses` if it has
      multiple labels that we support.

      The following code de-duplicates issues.
    */
    const mapIdToIssue = new Map();

    results.forEach(({ status, value }) => {
      if (status !== 'fulfilled') {
        // Discard bad data
        return;
      }

      const allIssues = value;

      allIssues.forEach((issue) => {
        const { id } = issue;

        if (!mapIdToIssue.has(id)) {
          mapIdToIssue.set(id, issue);
        }
      });
    });

    return Array.from(mapIdToIssue.values());
  }

  async fetchAllPullRequests() {
    /// 'user:ember-learn+NOT+builds+NOT+statusboard+help-wanted-issues:>0+archived:false';
    const query = `is:open is:pr user:ember-learn -label:dependencies`;
    const { data } = await this.octokit.search.issuesAndPullRequests({
      q: query,
      sort: 'updated',
      order: 'desc',
      per_page: NUM_ISSUES_PER_PAGE,
      page: 1,
    });

    return { prs: data.items };
  }

  async getRateLimit() {
    const { data } = await this.octokit.rateLimit.get();

    return data.resources.core;
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
