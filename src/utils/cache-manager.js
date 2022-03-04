const getEnv = require('../environment');
const { getGithubClient } = require('../lib/github-client');

const cacheUpdateIntervalInMinutes = getEnv('CACHE_UPDATE_INTERVAL_IN_MINUTES');
const cacheUpdateIntervalInMilliseconds =
  cacheUpdateIntervalInMinutes * 60 * 1000;

async function getAllIssues() {
  let client;

  try {
    console.log('fetching all issues');

    client = getGithubClient();
    return await client.fetchAllIssues();
  } catch (error) {
    console.error(error);

    const rateLimit = await client.getRateLimit();
    console.log('rate limit: ', JSON.stringify(rateLimit, null, 2));
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

    const rateLimit = await client.getRateLimit();
    console.log('rate limit: ', JSON.stringify(rateLimit, null, 2));
  }
}

async function getAllPullRequests() {
  let client;

  try {
    console.log('fetching all pullRequests');

    client = getGithubClient();
    const { prs } = await client.fetchAllPullRequests();

    return prs;
  } catch (error) {
    console.error(error);

    const rateLimit = await client.getRateLimit();
    console.log('rate limit: ', JSON.stringify(rateLimit, null, 2));
  }
}

async function fetchAndUpdate(onUpdate) {
  let issueCache = await getAllIssues();
  let repoCache = await getAllRepos();
  let prCache = await getAllPullRequests();
  onUpdate(issueCache, repoCache, prCache);
}

module.exports = {
  async start(onUpdate) {
    fetchAndUpdate(onUpdate);

    setInterval(() => {
      fetchAndUpdate(onUpdate);
    }, cacheUpdateIntervalInMilliseconds);
  },
};
