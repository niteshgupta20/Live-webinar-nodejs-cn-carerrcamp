const exress = require('express');
const router = exress.Router();
const Interview = require('../../models/company');

router.post('/create', async function callback(req, res) {
  try {
    const company = await Interview.create(req.body);
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

router.get('/get', async function callback(req, res) {
  try {
    const interviews = await Interview.find({});

    return res.status(200).json({
      message: 'Fetched All Successfully',
      data: interviews,
    });
  } catch (error) {
    console.log('**** Error in Get All Interview API ****', error);
    return res.status(500).json({
      message: 'Internal Server Error || Error while Fectching the interviews',
    });
  }
});

module.exports = router;
