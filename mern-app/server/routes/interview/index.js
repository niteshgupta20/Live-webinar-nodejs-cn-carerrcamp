const exress = require('express');
const router = exress.Router();
const Company = require('../../models/company');

router.post('/create', async function callback(req, res) {
  try {
    const company = await Company.create(req.body);
    return res.status(200).json({
      message: 'Interview created Successfully',
      data: company,
    });
  } catch (error) {
    console.log('**** Error in Create Interview API ****', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
