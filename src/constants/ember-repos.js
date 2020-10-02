const adopted_ember_addons = require('./repos/adopted-ember-addons');
const ember_learn = require('./repos/ember-learn');

const community = [
  ...adopted_ember_addons,
  { name: 'ember-cli/ember-twiddle', label: 'good first issue' },
  { name: 'ember-cli/ember-twiddle', label: 'help wanted' },
  { name: 'ember-engines/ember-engines', label: 'help wanted' },
  { name: 'typed-ember/ember-cli-typescript', label: 'good first issue' },
  { name: 'typed-ember/ember-cli-typescript', label: 'help wanted' },
];

const core = [
  { name: 'ember-cli/ember-cli', label: 'good first issue' },
  { name: 'emberjs/data', label: 'Good for New Contributors' },
  { name: 'emberjs/ember-inspector', label: 'good for new contributors' },
  { name: 'emberjs/ember-inspector', label: 'help wanted' },
  { name: 'emberjs/ember-optional-features', label: 'good first issue' },
  { name: 'emberjs/ember-optional-features', label: 'help wanted' },
  { name: 'emberjs/ember-test-helpers', label: 'beginner-friendly' },
  { name: 'emberjs/ember.js', label: 'Good for New Contributors' },
  { name: 'emberjs/ember.js', label: 'Help Wanted' },
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