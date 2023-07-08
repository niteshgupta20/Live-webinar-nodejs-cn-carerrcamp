const express = require('express');
const router = express.Router();
const Candidate = require('../../models/candidate');

router.post('/', async function callback(req, res) {
  try {

    let user = await Candidate.findOne({ email: req.body.email, password: req.body.password }, {password: 0});

    if (user) {
      return res.status(200).json({
        message: 'User Loggedin Successfully!',
        user: user,
        role: 'candidate'
      });
    }

    return res.status(401).json({
      message: 'Email/password is incorret'
    });
     
  } catch (error) {
     console.log("**** MANUAL AUTH API ****", error);
     return res.status(500).json({
      message: 'Internal Server Error'  
     });
   }
});

module.exports = router;