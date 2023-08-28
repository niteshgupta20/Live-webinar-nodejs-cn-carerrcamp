const express = require('express');
const router = express.Router();
const Admin = require('../../models/admin');

router.post('/', async function callback(req, res) {
  try {
    const isAdminExist = await Admin.findOne({ email: req.body.email });

    if (!isAdminExist) {
      const admin = await Admin.create(req.body);

      console.log(admin);

      return res.status(200).json({
        message: 'Admin created successfully',
        data: admin,
      });
    } else {
      return res.status(200).json({
        message: 'Admin Already Exists in database',
      });
    }
  } catch (error) {
    console.log('**** ADMIN SIGNUP API ****', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
