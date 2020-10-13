const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'ember-engines',

  repositoryNames: [
    'babel-plugin-compact-reexports',
    'broccoli-dependency-funnel',
    'ember-asset-loader',
    'ember-engines.com',
    'ember-engines',
    'engine-blueprint',
    'engine-testing',
  ],

  supportedLabels: [
    'good first issue',
    'hacktoberfest',
    'help wanted',
  ],
});

module.exports = githubOrganization.getReposWithSupportedLabels();