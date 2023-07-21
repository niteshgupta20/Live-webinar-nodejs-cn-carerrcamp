const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Candidate = require('../../models/candidate');

router.post('/', async function callback(req, res) {
  try {
    let user = await Candidate.findOne(
      { email: req.body.email, password: req.body.password },
      { password: 0 }
    );

    if (user) {
      // user.email :- payload/data
      // test:- secret or private key

      const token = jwt.sign(user.email, 'test');

      res.cookie('user', token);

      return res.status(200).json({
        message: 'User Loggedin Successfully!',
        user: user,
        role: 'candidate',
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

module.exports = router;
