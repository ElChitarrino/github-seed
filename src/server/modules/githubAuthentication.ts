import * as passport from 'passport';
let passportGithub = require('passport-github');
let merge = require('merge');

class GitHubAuthentication implements IGitHubAuthentication {
    constructor() {
        let passportOptions = {
                clientID: process.env.GITHUB_CLIENT,
                clientSecret: process.env.GITHUB_SECRET,
                authorizationURL: process.env.GITHUB_PROTOCOL + '://' + process.env.GITHUB_HOST + '/login/oauth/authorize',
                tokenURL: process.env.GITHUB_PROTOCOL + '://' + process.env.GITHUB_HOST + '/login/oauth/access_token',
                userProfileURL: process.env.GITHUB_PROTOCOL + '://' + process.env.GITHUB_API_BASE + process.env.GITHUB_API_PATH + '/user'
        };

        passport.use( new passportGithub.Strategy(passportOptions, function(accessToken, refreshToken, profile, done) {
            done(null, merge(profile._json, { token: accessToken }));
        }));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }

    public initialize() {
        return passport.initialize();
    }

    public session() {
        return passport.session();
    }

    public checkReturnTo(req, res, next) {
        let returnTo = req.query.redirect;
        if (returnTo) {
            req.session.returnTo = returnTo;
        }
        next();
    };

    public callback() {
        return passport.authenticate('github', { successReturnToOrRedirect: '/' });
    }

    public authenticate() {
        return passport.authenticate('github', { scope: ['user:email'] });
    }

    public logout(req, res, next) {
        req.logout();
        if (!req.query.noredirect) {
            res.redirect('/');
        } else {
            next();
        }
    }

}

export = new GitHubAuthentication;
