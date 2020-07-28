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
            res.send(req.user);
            // res.send('Callback URI');
        }
    );

    app.use('/auth', router);
};
