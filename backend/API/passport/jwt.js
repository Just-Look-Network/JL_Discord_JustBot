const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { jwtConfig } = require('../config/config');

const db = require('../models');
const User = db.users;

// ---------------------------------------------------------------------------
// Jwt options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.secret;

// ---------------------------------------------------------------------------
// Jwt Strategey
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        CheckUser(jwt_payload.data)
            .then(() => {
                return done(null, jwt_payload.data);
            })
            .catch((err) => {
                console.log(err);
                return done(null, false);
            });
    })
);

function CheckUser(input) {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: input })
            .then((currUser) => {
                if (currUser) {
                    resolve();
                } else {
                    reject('User not Found');
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
