module.exports = (app) => {
    const passport = require('passport');
    const router = require('express').Router();

    const discordStrat = require('../passport/discord');

    // ---------------------------------------------------------------------------
    // Discord Auth
    router.get('/discord', passport.authenticate('discord'));

    // ---------------------------------------------------------------------------
    // Discord Callback URL
    router.get(
        '/discord/callback',
        passport.authenticate('discord', {
            failureRedirect: '/'
        }),
        (req, res) => {
            res.redirect('http://localhost:3333/auth/discord/callback?jwt=' + req.user);
        }
    );

    app.use('/auth', router);
};
