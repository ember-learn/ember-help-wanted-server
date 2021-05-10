const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'adopted-ember-addons',

  repositoryNames: [
    'ember-autoresize',
    'ember-cli-bugsnag',
    'ember-cli-deploy-new-relic-sourcemap',
    'ember-cli-hot-loader',
    'ember-cli-ifa',
    'ember-cli-sass',
    'ember-cli-windows',
    'ember-collapsible-panel',
    'ember-collection',
    'ember-data-factory-guy',
    'ember-electron',
    'ember-file-upload',
    'ember-impagination',
    'ember-indexeddb-adapter',
    'ember-keyboard',
    'ember-launch-darkly',
    'ember-metrics',
    'ember-notify',
    'ember-page-title',
    'ember-pikaday',
    'ember-sortable',
    'ember-stripe-elements',
    'ember-theme-changerr',
    'emberx-select',
    'program-guidelines',
  ],

  supportedLabels: ['good first issue', 'hacktoberfest', 'help wanted'],
});

module.exports = githubOrganization.getReposWithSupportedLabels();
