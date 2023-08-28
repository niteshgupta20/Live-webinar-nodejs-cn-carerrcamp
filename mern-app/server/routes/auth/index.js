const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Candidate = require('../../models/candidate');
// const passport = require('../../config/passportLocalStrategy');
const passportJWT = require('../../config/passportJWT');
const GoogleOAuth = require('google-auth-library');

// router.post('/', async function callback(req, res) {
//   try {
//     let user = await Candidate.findOne(
//       { email: req.body.email, password: req.body.password },
//       { password: 0 }
//     );

//     if (user) {
// user.email :- payload/data
// test:- secret or private key

//       const token = jwt.sign(user.email, 'test');

//       res.cookie('user', token);

//       return res.status(200).json({
//         message: 'User Loggedin Successfully!',
//         user: user,
//         role: 'candidate',
//       });
//     }

//     return res.status(401).json({
//       message: 'Email/password is incorret',
//     });
//   } catch (error) {
//     console.log('**** MANUAL AUTH API ****', error);
//     return res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// });

router.post('/', async function callback(req, res) {
  try {
    let user = await Candidate.findOne(
      { email: req.body.email, password: req.body.password },
      { password: 0 }
    );

    if (user) {
      const token = jwt.sign({ email: user.email }, 'test');

      return res.status(200).json({
        message: 'User Loggedin Successfully!',
        user: req.user,
        role: 'candidate',
        token: token,
      });
    }
    return res.status(401).json({
      message: 'Email/password is incorret',
    });
  } catch (error) {
    console.log('**** MANUAL AUTH API ****', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.post('/google', async function (req, res) {
  const client = new GoogleOAuth.OAuth2Client(
    '921757122855-bflp0sr2r1irrl7sr993c3j4sstm2t07.apps.googleusercontent.com'
  );
  
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience:
      '921757122855-bflp0sr2r1irrl7sr993c3j4sstm2t07.apps.googleusercontent.com',
  });
  const profileData = ticket.getPayload();

  return res.status(200).json({
    data: profileData,
  });
});

module.exports = router;
