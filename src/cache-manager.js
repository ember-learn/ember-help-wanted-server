let getGithubClient = require('./github-client');

const CACHE_UPDATE_INTERVAL = 60 * 1000;

async function getAllIssues() {
  let client;

  try {
    console.log('fetching all issues');

    client = getGithubClient();
    return await client.fetchIssueSet();
  } catch (error) {
    console.error(error);
    const response = await client.getRateLimit()
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

async function fetchAndUpdate(onUpdate) {
  let newCache = await getAllIssues();
  onUpdate(newCache);
}

module.exports = {
  async start(onUpdate) {
    fetchAndUpdate(onUpdate);

    setInterval(() => {
      fetchAndUpdate(onUpdate);
    }, CACHE_UPDATE_INTERVAL);
  }
};
