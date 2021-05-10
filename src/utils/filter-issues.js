const getReposWithSupportedLabels = require('./get-repos-with-supported-labels');

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

  const reposWithSupportedLabels = getReposWithSupportedLabels(groupName);

  if (!reposWithSupportedLabels) {
    return [];
  }

  return issues.filter((issue) => {
    const repositoryName = getRepositoryName(issue.repository_url);
    const issueLabels = issue.labels.map(({ name }) => name.toLowerCase());

    const match = reposWithSupportedLabels.find(({ name, label }) => {
      const matchesRepositoryName = name === repositoryName;
      const matchesLabel = issueLabels.includes(label.toLowerCase());

      return matchesRepositoryName && matchesLabel;
    });
    const matchFound = !!match;

    return matchFound;
  });
}

module.exports = filterIssues;
module.exports.getRepositoryName = getRepositoryName;
