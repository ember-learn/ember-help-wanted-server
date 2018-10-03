let server = require('./server');
server.start();

let cacheManager = require('./cache-manager');
cacheManager.start(server.setCache.bind(server));
