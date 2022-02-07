/*
  We can decide which GitHub issues to search by specifying
  `organizations` and `labels` below.

  Afterwards, we filter issues by specifying `repositoryNames`
  and `supportedLabels` in a constants file.
*/
module.exports = {
  orgs: [
    'adopted-ember-addons',
    'ember-a11y',
    'ember-cli',
    'ember-data',
    'ember-engines',
    'ember-learn',
    'ember-template-lint',
    'emberjs',
    'empress',
    'typed-ember',
  ],

  labels: [
    'DecEmber',
    'Final Comment Period',
    'good first issue',
    'good for new contributors',
    'hacktoberfest',
    'help wanted',
    'help-wanted',
    'Needs Champion',
    'needs maintainer'
  ],
};
