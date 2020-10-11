const getEnv = require('../environment');
const { getGithubClient } = require('../lib/github-client');

const cacheUpdateIntervalInMinutes = getEnv('CACHE_UPDATE_INTERVAL_IN_MINUTES');
const cacheUpdateIntervalInMilliseconds = cacheUpdateIntervalInMinutes * 60 * 1000;

async function getAllIssues() {
  let client;

  try {
    console.log('fetching all issues');

    client = getGithubClient();
    return await client.fetchAllIssues();

  } catch (error) {
    console.error(error);
    const response = await client.getRateLimit()
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

async function getAllRepos() {
  let client;

  try {
    console.log('fetching all repos');

    client = getGithubClient();
    const { repos } = await client.fetchAllRepos();

    return repos;

  } catch (error) {
    console.error(error);
    const response = await client.getRateLimit()
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

async function fetchAndUpdate(onUpdate) {
  let issueCache = await getAllIssues();
  let repoCache = await getAllRepos();
  onUpdate(issueCache, repoCache);
}

module.exports = {
  async start(onUpdate) {
    fetchAndUpdate(onUpdate);

    setInterval(() => {
      fetchAndUpdate(onUpdate);
    }, cacheUpdateIntervalInMilliseconds);
  }
};
