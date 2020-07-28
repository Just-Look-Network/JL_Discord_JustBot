module.exports = (app) => {
    const passport = require('passport');
    const router = require('express').Router();

    const discordStrat = require('../passport/');

    // Start passport oauth
    router.get('/discord', passport.authenticate('discord'));

    // oauth callback url
    router.get(
        '/discord/callback',
        passport.authenticate('discord', {
            failureRedirect: '/'
        }),
        (req, res) => {
            res.redirect('/dashboard'); // Successful auth
        }
    );

    app.use('/auth', router);
};
