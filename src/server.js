const express = require('express');
const cors = require('cors');

const getEnv = require('./environment');
const filterIssues = require('./issue-filter');

const app = express();
const port = getEnv('PORT');

class Server {
  constructor() {
    this.issueCache = [];
    this.initializeRoutes();
  }

  start() {
    app.use(cors({
      origin: 'https://ember-help-wanted.netlify.com'
    }));
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
