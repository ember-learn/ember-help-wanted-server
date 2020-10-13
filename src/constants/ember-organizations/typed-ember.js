const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'typed-ember',

  repositoryNames: [
    'ember-cli-tslint',
    'ember-cli-typescript-blueprints',
    'ember-cli-typescript',
    'ember-data-shim-typings',
    'ember-typings Archived',
    'ember-typings-generator',
    'ember-unsafe-typings',
    'renovate-config',
    'semantic-release-config',
    'wip-types',
  ],

  supportedLabels: [
    'good first issue',
    'hacktoberfest',
    'help wanted',
  ],
});

module.exports = githubOrganization.getReposWithSupportedLabels();