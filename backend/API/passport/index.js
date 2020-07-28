const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const { discord } = require('../config/config');

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
            User.findOne({ id: profile.id }).then((currUser) => {
                if (currUser) {
                    console.log(`User allready exists: ${currUser}`);
                    done(null, currUser);
                } else {
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
                            done(null, data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        }
    )
);
