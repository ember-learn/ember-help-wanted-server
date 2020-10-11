const _ = require('lodash');
const octokit = require('@octokit/rest')();

const { orgs, labels } = require('../config');
const getEnv = require('../environment');

const API_TOKEN = getEnv('GITHUB_API_TOKEN');
const PAGE_SIZE = 100; // Github's max is 100
const MAX_PAGE_COUNT = 10; // Github's max record depth is 1000

let client;
module.exports = function() {
  if (client) {
    return client;
  }
  client = new GithubClient(octokit);
  return client;
}

class GithubClient {
  constructor(api) {
    this.api = api;

    this.api.authenticate({
      type: 'token',
      token: API_TOKEN
    });
  }

  buildQuery(label) {
    let orgQuery = orgs.map(org => `org:${org}`).join(' ');
    return `is:open ${orgQuery} label:"${label}"`;
  }

  async fetchIssuePage(label, page) {
    let query = this.buildQuery(label);
  
    let response = await octokit.search.issues({
      q: query,
      sort: 'updated',
      order: 'desc',
      per_page: PAGE_SIZE,
      page
    });
    return response.data.items;
  }

  async fetchAllRepos() {
    let query = 'user:ember-learn+NOT+builds+NOT+statusboard+help-wanted-issues:>0+archived:false'

    let response = await octokit.search.repos({
      q: query,
    });
    return response.data.items;
  }

  async fetchAllIssues(label) {
    let page = 0;
    let moreItems = true;
    let underPageLimit = true;
    let allIssues = [];

    while(moreItems && underPageLimit) {
      page++;
      let pageData = await this.fetchIssuePage(label, page);

      allIssues.push(pageData);

      moreItems = pageData.total_count > (pageData.length * page);
      underPageLimit = page < MAX_PAGE_COUNT;
    }
  
    return allIssues;
  }

  async fetchIssueSet() {
    const promises = labels.map(async (label) => {
      return this.fetchAllIssues(label);
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