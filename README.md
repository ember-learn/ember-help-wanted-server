[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/ember-help-wanted-server/workflows/CI/badge.svg)](https://github.com/ember-learn/ember-help-wanted-server/actions?query=workflow%3ACI)

ember-help-wanted-server
==============================================================================

This is a thin backend for [ember-help-wanted](https://github.com/ember-learn/ember-help-wanted). It searches for open GitHub issues in [Ember.js](https://emberjs.com/).


How to run
------------------------------------------------------------------------------

1. You will need to [create a GitHub token](https://github.com/settings/tokens/new). You can leave all checkboxes under "Select scopes" empty. We will be reading public data only.

1. Copy `.env.example` as `.env`. Then, edit `.env` by adding your GitHub token to `GITHUB_API_TOKEN`.

1. Run `npm start`.

    ```bash
    npm start

    $ node src/index.js
    fetching all issues
    listening on port 3000!
    fetching all repos
    ```

1. To check if the server app's working, visit [http://localhost:3000/github-issues?group=core](http://localhost:3000/github-issues?group=core). You will see an array of POJOs (GitHub issues). If you see an empty array, try refreshing the page.


Continuous integration
------------------------------------------------------------------------------

We use [GitHub Actions](.github/workflows/ci.yml) to lint and test the app when a PR (pull request) is created and merged.

Run the following commands to lint and test from local machine:

```bash
npm run lint
npm test
```

To fix linting errors, try the following command:

```bash
npm run lint:fix
```


Compatibility
------------------------------------------------------------------------------

- Node.js v18.9 or above
