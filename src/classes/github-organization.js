class GithubOrganization {
  constructor({
    organizationName = '',
    repositoryNames = [],
    supportedLabels = [],
  }) {
    this.organizationName = organizationName;
    this.repositoryNames = repositoryNames;
    this.supportedLabels = supportedLabels;
  }


  getReposWithSupportedLabels() {
    const organizationName = this.organizationName;
    const repositoryNames = this.repositoryNames;
    const supportedLabels = this.supportedLabels;

    /*
      TODO:

      Once we redefine `groupName` to mean a GitHub organization,
      change `reposWithSupportedLabels` to be a Map instance.

      This should help us filter issues more efficiently.
    */
    const reposWithSupportedLabels = [];

    repositoryNames.forEach(repositoryName => {
      const name = `${organizationName}/${repositoryName}`;

      supportedLabels.forEach(label => {
        reposWithSupportedLabels.push({ name, label });
      });
    });

    return reposWithSupportedLabels;
  }
}

module.exports = GithubOrganization;