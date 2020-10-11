const { assert } = require('chai');
const { afterEach, beforeEach, describe, it } = require('mocha');
const nock = require('nock');

const getGithubClient = require('../../src/lib/github-client');


describe('lib/github-client', function() {
  beforeEach(function() { 
    nock.disableNetConnect();
  });

  afterEach(function() {
    nock.enableNetConnect();
  });


  describe('getGithubClient', function() {
    it('works', function() {
      const client = getGithubClient();

      assert.isDefined(client);
    });
  });
});