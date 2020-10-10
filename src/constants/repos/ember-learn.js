const organizationName = 'ember-learn';

const repositoryNames = [
  // '.github',
  'DEPRECATED-cli-guides-app',
  'DEPRECATED-tutorial-app',
  'DEPRECATED-tutorials',
  'addon-contributors-workshop',
  'agendas',
  'algolia-index-update-scripts',
  'annual-community-survey',
  'builds',
  'cli-guides',
  'contact-book',
  'contribution-guides',
  'dashboard',
  'deprecation-app',
  'discourse-emberjs-theme',
  'dockerized-ember',
  'docs-whyEmber',
  'ember-api-docs',
  'ember-blog',
  'ember-cli-addon-docs',
  'ember-cli-addon-docs-esdoc',
  'ember-cli-addon-docs-yuidoc',
  'ember-cli-tutorial-style',
  'ember-cli.github.io',
  'ember-core-dashboard',
  'ember-help-wanted',
  'ember-help-wanted-backend',
  'ember-help-wanted-server',
  'ember-help-wanted-webhook',
  'ember-issue-triage-chrome',
  'ember-issue-triage-lambda',
  'ember-jsonapi-docs',
  'ember-learn-search-components',
  'ember-lighthouse-ci-server',
  'ember-octane-vs-classic-cheat-sheet',
  'ember-release-bot',
  'ember-simple-google-maps',
  'ember-simple-leaflet-maps',
  'ember-styleguide',
  'ember-styleguide-experimental',
  'ember-survey',
  'ember-times-tools',
  'ember-website',
  'emberjs-contributors-workshop',
  'empress-blog-ember-template',
  'gh-team-copy',
  'glimmer-hn',
  'glimmer-styleguide',
  'glimmer-url-shortener',
  'guidemaker-ember-template',
  'guides-app',
  'guides-redirect',
  'guides-source',
  'handbook',
  'intro-to-ember-workshops',
  'mentorship-workshop',
  'middleman-deploy',
  'middleman-toc',
  'outreach',
  'released-js-docs',
  'statusboard',
  // 'super-rentals',
  'super-rentals-tutorial',
  'test-gh-actions',
  'the-shortest-ember-book',
  'tomster-chatbot',
  'tutorial-quick-start',
  'tutorials',
  'upgrade-guide',
  'whats-new-in-emberland',
];

const supportedLabels = [
  'december',
  'good first issue',
  'hacktoberfest',
  'help wanted',
];

const ember_learn = repositoryNames.reduce((accumulator, repositoryName) => {
  const name = `${organizationName}/${repositoryName}`;

  supportedLabels.forEach(label => {
    accumulator.push({ name, label });
  });

  return accumulator;

}, []);


module.exports = ember_learn;