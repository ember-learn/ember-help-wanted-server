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
    'empress-blog-attila-template',
    'empress-blog-base-template Archived',
    'empress-blog-casper-template',
    'empress-blog-ghost-helpers',
    'empress-blog-netlify-casper-template',
    'empress-blog-starter-template',
    'empress-blog',
    'empress-blueprint-helpers',
    'field-guide-addon-docs-template',
    'field-guide-default-template',
    'field-guide',
    'guidemaker-default-template',
    'guidemaker-link-checker',
    'guidemaker-netlify-default-template',
    'guidemaker-toc-checker',
    'guidemaker',
    'open-slide-reveal-template',
    'open-slide',
    'rfc-process-mdbook-template',
    'rfc-process',
    'static-postcss-addon-tree',
    'training-buddy-default-template',
    'training-buddy',
  ],

  supportedLabels: [
    'good first issue',
    'hacktoberfest',
    'help wanted',
  ],
});

module.exports = githubOrganization.getReposWithSupportedLabels();