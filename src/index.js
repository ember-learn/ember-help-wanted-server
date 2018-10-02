const express = require('express');
const _ = require('lodash');

let getGithubClient = require('./github-client');

const app = express();
const port = 3000;

function filterIssues(issues, searchLabel, searchRepo) {
  if (searchLabel) {
    issues = issues.filter((issue) => {
      return _.some(issue.labels, (label) => {
        return label.name.toLowerCase() === searchLabel;
      });
    });
  }

  if (searchRepo) {
    issues = issues.filter((issue) => {
      return _.endsWith(issue.repository_url, searchRepo);
    });
  }

  return issues;
}

let allIssues;
app.get('/github-issues', (req, res) => {
  let label = req.query.labels.toLowerCase();
  let repo = req.query.repo.toLowerCase();
  let results = filterIssues(allIssues, label, repo);
  res.json(results);
});

async function getAllIssues() {
  let client;

  try {
    console.log('fetching all issues');

    client = getGithubClient();
    allIssues = await client.fetchIssueSet();

    app.listen(port, () => console.log(`listening on port ${port}!`));

  } catch (error) {
    console.error(error);
    const response = await client.getRateLimit()
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

getAllIssues();
