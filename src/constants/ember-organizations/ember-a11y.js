const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'ember-a11y',

  repositoryNames: [
    'a11y-announcer',
    'a11y-demo-app',
    'core-notes',
    'ember-a11y-landmarks',
    'ember-a11y-refocus',
    'ember-a11y-testing',
    'ember-a11y.com',
    'ember-a11y',
    'ember-component-focus',
    'with-pair',
  ],

  supportedLabels: [
    'good first issue',
    'hacktoberfest',
    'help wanted',
  ],
});

module.exports = githubOrganization.getReposWithSupportedLabels();