let githubApi = require('github');

class GitHubApi implements IGitHubApi {
    private github;

    constructor() {
        this.github = new githubApi({
            version: '3.0.0',
            protocol: process.env.GITHUB_PROTOCOL,
            host: process.env.GITHUB_API_BASE,
            pathPrefix: process.env.GITHUB_API_PATH,
            timeout: 5000
        });
    }

    public following(req, res) {
        this.github.authenticate({
            type: 'oauth',
            token: req.user.token
        });

        this.github.user.getFollowing({ }, function(err, ghRes) {
            res.status(200).send(ghRes);
        });
    }
}

export = new GitHubApi;
