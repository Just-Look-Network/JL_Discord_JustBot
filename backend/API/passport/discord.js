const jwt = require('jsonwebtoken');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
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

                    // ---------------------------------------------------------------------------
                    // JWT Token sign for existing user
                    let token = jwt.sign(
                        {
                            data: currUser._id
                        },
                        jwtConfig.secret,
                        { expiresIn: 1000 * 60 * 60 * 24 * 14 }
                    );
                    done(null, token);
                    // ---------------------------------------------------------------------------
                } else {
                    console.log('Create new User');
                    user.save(user)
                        .then((newUser) => {
                            console.log(`New User created: ${newUser}`);
                            // ---------------------------------------------------------------------------
                            // JWT Token sign
                            let token = jwt.sign(
                                {
                                    data: newUser._id
                                },
                                jwtConfig.secret,
                                { expiresIn: 1000 * 60 * 60 * 24 * 14 }
                            );
                            done(null, token);
                            // ---------------------------------------------------------------------------
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        }
    )
);
