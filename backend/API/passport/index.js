const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const { discord } = require('../config/config');

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(
    new DiscordStrategy(
        {
            // Options
            clientID: discord.clientID,
            clientSecret: discord.clientSecret,
            callbackURL: '/auth/discord/callback',
            scope: scopes
        },
        (accessToken, refreshToken, profile, callback) => {
            // passport callback function
            console.log(profile);
        }
    )
);
