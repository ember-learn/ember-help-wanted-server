const octokit = require('@octokit/rest')();
const _ = require('lodash');

const API_TOKEN = '787d14f949f1d780031860659b563c55eee59dff';

let labels = [
  'help wanted',
  'good for new contributors',
  'good first issue',
  'hacktoberfest'
];

function buildQuery(label) {
  let orgs = [
    'emberjs',
    'ember-learn',
    'ember-cli', 
    'ember-engines'
  ];

  let orgQuery = orgs.map(org => `org:${org}`).join(' ');
  return `${orgQuery} label:"${label}"`;
}

// let rfcs = [
//   { repo: 'emberjs/rfcs', labels: 'Final Comment Period' },
//   { repo: 'emberjs/rfcs', labels: 'Needs Champion' }
// ];

async function fetchIssuePage(label, page) {
  let query = buildQuery(label);
  console.log('searching: ', query, `page:${page}`);

  let response = await octokit.search.issues({
    q: query,
    sort: 'updated',
    order: 'desc',
    per_page: 100, // max allowed
    page
  });
  return response.data.items;
}

async function fetchIssues(label) {
  let page = 0;
  let moreItems = true;
  let underPageLimit = true;
  let allIssues = [];

  while(moreItems && underPageLimit) {
    page++;
    let pageData = await fetchIssuePage(label, page);

    allIssues.push(pageData.items);

    moreItems = pageData.total_count > (pageData.items.length * page);
    underPageLimit = page < 10;
  }

  return allIssues;
}

async function work() {
  try {
    octokit.authenticate({
      type: 'token',
      token: API_TOKEN
    });


    const promises = labels.map(async (label) => {
      return await fetchIssuePage(label, 1);
    });
    let results = await Promise.all(promises);

    let allIssues = _.uniqWith(_.flatten(results), (a, b) => {
      return a.id === b.id;
    });

    console.log('Found: ', allIssues.length);
    console.log('Example: ', allIssues[0]);

  } catch (error) {
    console.error(error);
    const response = await octokit.misc.getRateLimit({})
    console.log('rate limit: ', JSON.stringify(response.data, null, 2));
  }
}

work();
