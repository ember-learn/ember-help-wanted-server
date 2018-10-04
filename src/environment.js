let typeMap = {
  SERVER_PORT: Number,
  CACHE_UPDATE_INTERVAL: Number
};

module.exports = function(key, defaultValue) {
  let value = process.env[key];
  if (value) {
    if (typeMap[key] === Number) {
      value = parseInt(value, 10);
    }
    return value;
  }

  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Undefined environment variable: ${key}`);
};
