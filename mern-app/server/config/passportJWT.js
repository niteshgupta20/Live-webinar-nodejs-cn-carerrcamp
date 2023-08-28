const passport = require('passport');
const passportJWT = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Candidate = require('../models/candidate');

passport.use(
  new passportJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
      secretOrKey: 'test',
    },
    async function verify(payload, done) {
      try {
        const user = await Candidate.findOne({ email: payload.email });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log('***** Error in passport JWT Middleware ****', err);
        return;
      }
    }
  )
);

module.exports = passport;
