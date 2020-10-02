const { allFilters } = require('../constants/ember-repos');

function getRepositoryName(repositoryUrl) {
  if (!repositoryUrl) {
    return;
  }

  const API_URL = 'https://api.github.com/repos/';
  const repositoryName = repositoryUrl.replace(API_URL, '');

  return repositoryName;
}

function filterIssues(issues, groupName) {
  if (!issues) {
    return [];
  }

  const filters = allFilters[groupName];

  if (!filters) {
    return [];
  }

  return issues.filter(issue => {
    const repositoryName = getRepositoryName(issue.repository_url);
    const issueLabels = issue.labels.map(({ name }) => name.toLowerCase());

    const match = filters.find(({ repo, labels }) => {
      const matchesRepositoryName = repo === repositoryName;
      const matchesLabel = issueLabels.includes(labels.toLowerCase());

      return matchesRepositoryName && matchesLabel;
    });
    const matchFound = !!match;

    return matchFound;
  });
}

module.exports = filterIssues;
module.exports.getRepositoryName = getRepositoryName;
