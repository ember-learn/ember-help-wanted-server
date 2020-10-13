const adopted_ember_addons = require('../constants/ember-organizations/adopted-ember-addons');
const ember_a11y = require('../constants/ember-organizations/ember-a11y');
const ember_cli = require('../constants/ember-organizations/ember-cli');
const ember_data = require('../constants/ember-organizations/ember-data');
const ember_engines = require('../constants/ember-organizations/ember-engines');
const ember_learn = require('../constants/ember-organizations/ember-learn');
const ember_template_lint = require('../constants/ember-organizations/ember-template-lint');
const emberjs = require('../constants/ember-organizations/emberjs');
const empress = require('../constants/ember-organizations/empress');
const typed_ember = require('../constants/ember-organizations/typed-ember');

const community = [
  ...adopted_ember_addons,
  { name: 'ember-engines/ember-engines', label: 'help wanted' },
  { name: 'typed-ember/ember-cli-typescript', label: 'good first issue' },
  { name: 'typed-ember/ember-cli-typescript', label: 'help wanted' },
];

const core = [
  ...ember_cli,
  ...emberjs,
];

const emberHelpWanted = [
  { name: 'ember-learn/ember-help-wanted', label: 'good first issue' },
  { name: 'ember-learn/ember-help-wanted', label: 'help wanted' },
];

const learning = ember_learn;

const rfcs = [
  { name: 'emberjs/rfcs', label: 'Final Comment Period' },
  { name: 'emberjs/rfcs', label: 'Needs Champion' },
];

const mapGroupNameToRepositories = new Map([
  // GitHub organizations
  ['adopted-ember-addons', adopted_ember_addons],
  ['ember-a11y', ember_a11y],
  ['ember-cli', ember_cli],
  ['ember-data', ember_data],
  ['ember-engines', ember_engines],
  ['ember-learn', ember_learn],
  ['ember-template-lint', ember_template_lint],
  ['emberjs', emberjs],
  ['empress', empress],
  ['typed-ember', typed_ember],

  // Custom categories
  ['RFCs', rfcs],

  // @deprecated
  /*
    TODO:

    Once the client app implements filters based on organizations
    and custom categories, remove the filters below.
  */
  ['community', community],
  ['core', core],
  ['emberHelpWanted', emberHelpWanted],
  ['learning', learning]
]);

function getReposWithSupportedLabels(groupName) {
  return mapGroupNameToRepositories.get(groupName);
}

module.exports = getReposWithSupportedLabels;