module.exports = (app) => {
    const passport = require('passport');
    const router = require('express').Router();

    const discordStrat = require('../passport/discord');

    // Start passport oauth
    router.get('/discord', passport.authenticate('discord'));

    // oauth callback url
    router.get(
        '/discord/callback',
        passport.authenticate('discord', {
            failureRedirect: '/'
        }),
        (req, res) => {
            res.redirect('http://localhost:3333/auth/discord/callback?jwt=' + req.user);
            // res.json({ jwt: req.user });
            // res.send('Callback URI');
        }
    );

    app.use('/auth', router);
};
