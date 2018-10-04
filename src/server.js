const express = require('express');

const getEnv = require('./environment');
const filterIssues = require('./issue-filter');

const app = express();
const port = getEnv('SERVER_PORT');

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
      let group = req.query.group;
      let results = filterIssues(this.issueCache, group);
      res.json(results);
    });
  }

  setCache(newCache) {
    this.issueCache = newCache;
  }
}

module.exports = new Server();