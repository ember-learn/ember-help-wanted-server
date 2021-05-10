const GithubOrganization = require('../../classes/github-organization');

const githubOrganization = new GithubOrganization({
  organizationName: 'empress',

  repositoryNames: [
    'broccoli-static-site-json',
    'create-empress-blog-template',
    'documentation',
    'ember-cli-deploy-prember-algolia',
    'ember-ghost-netlify-casper-template',
    'ember-showdown-prism',
    'empress-blog',
    'empress-blog-attila-template',
    // 'empress-blog-base-template',
    'empress-blog-casper-template',
    'empress-blog-ghost-helpers',
    'empress-blog-netlify-casper-template',
    'empress-blog-starter-template',
    'empress-blueprint-helpers',
    'field-guide',
    'field-guide-addon-docs-template',
    'field-guide-default-template',
    'guidemaker',
    'guidemaker-default-template',
    'guidemaker-link-checker',
    'guidemaker-netlify-default-template',
    'guidemaker-toc-checker',
    'open-slide',
    'open-slide-reveal-template',
    'rfc-process',
    'rfc-process-mdbook-template',
    'static-postcss-addon-tree',
    'training-buddy',
    'training-buddy-default-template',
  ],

  supportedLabels: ['good first issue', 'hacktoberfest', 'help wanted'],
});

module.exports = githubOrganization.getReposWithSupportedLabels();
