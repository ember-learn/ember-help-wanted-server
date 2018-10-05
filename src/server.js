const express = require('express');
const cors = require('cors');

const getEnv = require('./environment');
const filterIssues = require('./issue-filter');

const app = express();
const PORT = getEnv('PORT');
const CORS_ORIGIN = getEnv('CORS_ORIGIN', null);

class Server {
  constructor() {
	this.issueCache = [];
	this.configureMiddleware();
	this.initializeRoutes();
  }

  configureMiddleware() {
    if (CORS_ORIGIN) {
      app.use(cors({
        origin: CORS_ORIGIN
      }));
    }
  }

  start() {
    app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
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
