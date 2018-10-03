module.exports = function(key, defaultValue) {
  let value = process.env[key];
  if (value) {
    return value;
  }

  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Undefined environment variable: ${key}`);
};
