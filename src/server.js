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
    /**
     * This will confirgure Cross Orign Resource Sharing (CORS) on the express server
     * if either CORS_ORIGIN or CORS_ALLOW_PATTERN are set.
     *
     * CORS_ALLOW_PATTERN will be passed into String.prototype.match() and matched against the
     * origin of the incoming request. If it matches then cors will be turned on for this request.
     *
     * If the pattern matching fails it will then do a === comparison on the request's
     * origain against the CORS_ORIGIN env variable. If they match then it will turn on
     * CORS for this request
     *
     * This setup allows both CORS_ORIGIN and CORS_ALLOW_PATTERN to be optional
     */
    if (CORS_ORIGIN || CORS_ALLOW_PATTERN) {
      app.use(cors({
        origin: function (origin, callback) {
          // if origin is not defined then we are not in a CORS situation and by
          // the spec we should allow this request
          if (!origin) {
            callback(null, true);
          }

          if(CORS_ALLOW_PATTERN && origin.match(CORS_ALLOW_PATTERN)) {
            return callback(null, true);
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
