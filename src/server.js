const express = require('express');
const cors = require('cors');

const getEnv = require('./environment');
const filterIssues = require('./issue-filter');

const app = express();
const PORT = getEnv('PORT');
const CORS_ORIGIN = getEnv('CORS_ORIGIN', null);
const CORS_ALLOW_PATTERN = getEnv('CORS_ALLOW_PATTERN', null);

class Server {
  constructor() {
    this.issueCache = [];
    this.configureMiddleware();
    this.initializeRoutes();
  }

  configureMiddleware() {
    if (CORS_ORIGIN) {
      app.use(cors({
        origin: function (origin, callback) {
          if(CORS_ALLOW_PATTERN) {
            if(origin.match(CORS_ALLOW_PATTERN)) {
              return callback(null, true);
            }
          }

          if(origin === CORS_ORIGIN) {
            return callback(null, true);
          }

          callback(new Error('Not allowed by CORS'))
        }
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
