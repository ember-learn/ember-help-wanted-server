let getGithubClient = require('./github-client');

async function work() {
  let client;

  try {
    client = getGithubClient();
    let allIssues = await client.fetchIssueSet();
    slkdjfsldkjfsdlkfj;
    console.log('Found: ', allIssues.length);
    console.log('Example: ', allIssues[0]);

  } catch (error) {
    console.error(error);
    const response = await client.getRateLimit()
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

work();
