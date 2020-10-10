const adopted_ember_addons = require('./repos/adopted-ember-addons');
const ember_cli = require('./repos/ember-cli');
const ember_learn = require('./repos/ember-learn');
const emberjs = require('./repos/emberjs');

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

const octane = [];

const rfcs = [
  { name: 'emberjs/rfcs', label: 'Final Comment Period' },
  { name: 'emberjs/rfcs', label: 'Needs Champion' },
];

const mapGroupNameToRepositories = new Map([
  ['community', community],
  ['core', core],
  ['emberHelpWanted', emberHelpWanted],
  ['learning', learning],
  ['octane', octane],
  ['rfcs', rfcs],
]);

function getRepositories(groupName) {
  return mapGroupNameToRepositories.get(groupName);
}

module.exports = getRepositories;