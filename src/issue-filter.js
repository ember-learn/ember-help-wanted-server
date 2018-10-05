const _ = require('lodash');

let core = [
  { repo: 'emberjs/ember.js', labels: 'Help Wanted' },
  { repo: 'emberjs/ember.js', labels: 'Good for New Contributors' },
  { repo: 'emberjs/data', labels: 'Good for New Contributors' },
  { repo: 'ember-cli/ember-cli', labels: 'good first issue' },
  { repo: 'emberjs/ember-inspector', labels: 'help wanted' },
  { repo: 'emberjs/ember-inspector', labels: 'good for new contributors' },
  { repo: 'emberjs/website', labels: 'help wanted' },
  { repo: 'emberjs/website', labels: 'good first issue' },
  { repo: 'emberjs/ember-test-helpers', labels: 'beginner-friendly' },
  { repo: 'emberjs/ember-optional-features', labels: 'help wanted' },
  { repo: 'emberjs/ember-optional-features', labels: 'good first issue' },
  { repo: 'emberjs/website', labels: 'help wanted' },
  { repo: 'emberjs/website', labels: 'good first issue' }
];

let learning = [
  { repo: 'ember-learn/ember-styleguide', labels: 'help wanted :sos:' },
  { repo: 'ember-learn/guides-source', labels: 'help wanted' },
  { repo: 'ember-learn/guides-app', labels: 'help wanted' },
];

let community = [
  { repo: 'typed-ember/ember-cli-typescript', labels: 'help wanted' },
  { repo: 'typed-ember/ember-cli-typescript', labels: 'good first issue' },
  { repo: 'ember-engines/ember-engines', labels: 'help wanted' }
];

let rfcs = [
  { repo: 'emberjs/rfcs', labels: 'Final Comment Period' },
  { repo: 'emberjs/rfcs', labels: 'Needs Champion' }
];

let emberHelpWanted = [
  { repo: 'ember-learn/ember-help-wanted', labels: 'help wanted' },
  { repo: 'ember-learn/ember-help-wanted', labels: 'good first issue' }
];

let allFilters = { core, learning, community, rfcs, emberHelpWanted };

function getRepo(issue) {
  // Example: "https://api.github.com/repos/ember-learn/guides-source"
  let parts = issue.repository_url.split('/');
  return `${parts[4]}/${parts[5]}`;
}

module.exports = function filterIssues(issues, group) {
  let groupFilters = allFilters[group];

  return issues.filter((issue) => {
    let issueLabels = issue.labels.map(label => label.name.toLowerCase());
    return _.some(groupFilters, (filter) => {
      let matchesLabel = _.includes(issueLabels, filter.labels.toLowerCase());
      let matchesRepo = getRepo(issue) === filter.repo;
      return matchesLabel && matchesRepo;
    });
  });
};