const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const { discord } = require('../config/config');

const db = require('../models');
const User = db.users;

const scopes = ['identify', 'email', 'guilds'];

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
            // console.log(profile);

            User.findOne({ id: profile.id }).then((currUser) => {
                if (currUser) {
                    // User exists
                    console.log(`User allready exists: ${currUser}`);
                    return;
                } else {
                    // new User
                    console.log('Create new User');

                    const user = new User({
                        id: profile.id,
                        username: profile.username,
                        discriminator: profile.discriminator,
                        email: profile.email
                    });

                    // Save Tutorial in the database
                    user.save(user)
                        .then((data) => {
                            console.log(`New User created: ${data}`);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        }
    )
);
