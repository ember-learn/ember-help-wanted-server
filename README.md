# ember-help-wanted-server

This is a thin backend for ember-help-wanted that proxies calls to the github API.

# Running in Development

1. You will need to [create a Github token](https://github.com/settings/tokens/new). You don't need to check any of the "select scopes" checkboxes -- we will only be reading public data.

2. Copy `.env.example` to `.env` and edit `.env`, inserting your Github token.

3. Run `yarn start`.

4. To check that it's working, try looking at http://localhost:3000/github-issues?group=core.
