const organizationName = 'adopted-ember-addons';

const repositoryNames = [
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
];

const supportedLabels = [
  'good first issue',
  'hacktoberfest',
  'help wanted',
];

const adopted_ember_addons = repositoryNames.reduce((accumulator, repositoryName) => {
  const name = `${organizationName}/${repositoryName}`;

  supportedLabels.forEach(label => {
    accumulator.push({ name, label });
  });

  return accumulator;

}, []);


module.exports = adopted_ember_addons;