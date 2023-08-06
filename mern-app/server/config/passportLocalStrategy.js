const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Candidate = require('../models/candidate');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function verify(email, password, done) {
      try {
        const candidate = await Candidate.findOne({ email, password });
        if (candidate) {
          done(null, candidate);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log('*** Error in passport Middleware ***', error);
        done(error, false);
      }
    }
  )
);

// TO SEND THE COOKIE WHEN SUCESSFULLY LOGGED IN
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// TO VERIFY THE COOKIE
passport.deserializeUser(async function (id, done) {
  try {
    const candidate = Candidate.findById(id);
    if (candidate) {
      done(null, candidate);
    } else {
      done(null, false);
    }
  } catch (error) {
    console.log('*** Error in deserializeUser ***', error);
    done(error, false);
  }
});

module.exports = passport;
