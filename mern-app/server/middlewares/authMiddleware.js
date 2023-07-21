const Candidate = require('../models/candidate');

exports.authMiddleware1 = async function (req, res, next) {
  try {
    if (req.cookies.user) {
      const user = await Candidate.findOne({ email: req.cookies.user });

      if (user) {
        // include user in the user object so that user is available in the API's
        req.user = user
        next();
      } else {
        return res.status(404).json({
          message: 'User Not Found',
        });
      }
    } else {
      return res.status(403).json({
        message: 'Please Login Again',
      });
    }
  } catch (error) {
    console.log('**** AUTH MIDDLEWARE1 ****', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
