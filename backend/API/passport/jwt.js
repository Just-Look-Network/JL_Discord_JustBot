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
// opts.jwtFormRequest = (req) => {
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies['jwt'];
//     }
//     return token;
// };

opts.secretOrKey = jwtConfig.secret;

// ---------------------------------------------------------------------------
// Jwt Strategey
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('JWT BASED VALIDATION GETTING CALLED!');
        console.log('JWT', jwt_payload);

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
        console.log(input.id);

        User.findOne({ email: input.email })
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
