const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'ember-data',

  repositoryNames: [
    'active-model-adapter-dist',
    'active-model-adapter',
    'babel-plugin-ember-data-packages-polyfill',
    'ds-improved-ajax',
    'ember-data-filter',
    'ember-data-live-filter-by',
    'ember-data-rfc395-data',
    'json-api-validator',
    'record-data-spec',
    'serializer-1x',
  ],

  supportedLabels: ['good first issue', 'hacktoberfest', 'help wanted'],
});

module.exports = githubOrganization.getReposWithSupportedLabels();
