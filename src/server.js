const express = require('express');
const _ = require('lodash');

const getEnv = require('./environment');

const app = express();
const port = getEnv('PORT');

class Server {
  constructor() {
    this.issueCache = [];
    this.initializeRoutes();
  }

  start() {
    app.listen(port, () => console.log(`listening on port ${port}!`));
  }

  initializeRoutes() {
    app.get('/github-issues', (req, res) => {
      let label = req.query.labels.toLowerCase();
      let repo = req.query.repo.toLowerCase();
      let results = filterIssues(this.issueCache, label, repo);
      res.json(results);
    });
  }

  setCache(newCache) {
    this.issueCache = newCache;
  }
}

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

module.exports = new Server();
