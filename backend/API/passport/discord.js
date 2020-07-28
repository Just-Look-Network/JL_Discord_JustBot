const jwt = require('jsonwebtoken');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const { discord, jwtConfig } = require('../config/config');

const db = require('../models');
const User = db.users;

const scopes = ['identify', 'email', 'guilds'];
const prompt = 'consent';

// ---------------------------------------------------------------------------
// serialize / deserialize
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// ---------------------------------------------------------------------------
// Discord Strategey
passport.use(
    new DiscordStrategy(
        {
            // Options
            clientID: discord.clientID,
            clientSecret: discord.clientSecret,
            callbackURL: '/auth/discord/callback',
            scope: scopes,
            prompt: prompt
        },
        (accessToken, refreshToken, profile, done) => {
            const user = new User({
                id: profile.id,
                username: profile.username,
                discriminator: profile.discriminator,
                email: profile.email
            });

            // ---------------------------------------------------------------------------
            // Search exsiting user / save new user
            User.findOne({ id: profile.id }).then((currUser) => {
                if (currUser) {
                    console.log(`User allready exists: ${currUser}`);
                } else {
                    console.log('Create new User');

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

            // ---------------------------------------------------------------------------
            // JWT Token sign
            let token = jwt.sign(
                {
                    data: user
                },
                jwtConfig.secret,
                { expiresIn: 1000 * 60 * 60 * 24 * 14 }
            );
            done(null, token);
        }
    )
);
