const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'ember-template-lint',

  repositoryNames: [
    'ember-cli-template-lint',
    'ember-template-lint-plugin-prettier',
    'ember-template-lint-todo-utils',
    'ember-template-lint',
    'ember-template-recast',
    'eslint-plugin-hbs',
    'website',
  ],

  supportedLabels: [
    'good first issue',
    'hacktoberfest',
    'help wanted',
  ],
});

module.exports = githubOrganization.getReposWithSupportedLabels();