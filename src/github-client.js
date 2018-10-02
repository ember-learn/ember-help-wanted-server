const _ = require('lodash');
const octokit = require('@octokit/rest')();

const {orgs, labels} = require('./config');

const API_TOKEN = '787d14f949f1d780031860659b563c55eee59dff';
const PAGE_SIZE = 100; // Github's max is 100

// let rfcs = [
//   { repo: 'emberjs/rfcs', labels: 'Final Comment Period' },
//   { repo: 'emberjs/rfcs', labels: 'Needs Champion' }
// ];

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
    return `${orgQuery} label:"${label}"`;
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
  
  async fetchAllIssues(label) {
    let page = 0;
    let moreItems = true;
    let underPageLimit = true;
    let allIssues = [];
  
    while(moreItems && underPageLimit) {
      page++;
      let pageData = await this.fetchIssuePage(label, page);
  
      allIssues.push(pageData.items);
  
      moreItems = pageData.total_count > (pageData.items.length * page);
      underPageLimit = page < 10;
    }
  
    return allIssues;
  }

  async fetchIssueSet() {
    const promises = labels.map(async (label) => {
      return await this.fetchIssuePage(label, 1);
    });
    let results = await Promise.all(promises);

    return _.uniqWith(_.flatten(results), (a, b) => {
      return a.id === b.id;
    });
  }

  async getRateLimit() {
    return await this.api.misc.getRateLimit({});
  }
}