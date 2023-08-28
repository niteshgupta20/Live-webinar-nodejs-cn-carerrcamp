const express = require('express');
const router = express.Router();
const middleware = require('../../middlewares/authMiddleware');
const mongoose = require('mongoose');
const Candidate = require('../../models/candidate');
const passportJWT = require('../../config/passportJWT');

router.get(
  '/',
  passportJWT.authenticate('jwt', { session: false }),
  async function callback(req, res) {
    console.log(req.user);
    try {
      const students = await Candidate.find({});

      return res.status(200).json({
        message: 'Students fetched successfully!',
        data: students,
      });
    } catch (error) {
      console.log('**** GET ALL STUDENT API ****', error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);

router.post('/', async function callback(req, res) {
  try {
    const isStudentExists = await Candidate.find({ email: req.body.email });

    if (isStudentExists.length != 0) {
      return res.status(403).json({
        message: 'Student Already exist!',
      });
    }

    const student = await Candidate.create(req.body);

    // console.log(req.body);
    // students.push(req.body);

    return res.status(200).json({
      message: 'Student created successfully!',
      data: student,
    });
  } catch (error) {
    console.log('**** CREATE STUDENT API ****', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.put(
  '/:id',
  middleware.authMiddleware3,
  async function callback(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({
          message: 'Please provide valid id',
        });
      }

      let student = await Candidate.findOne(
        { email: req.user.email },
        { _id: 1 }
      );

      if (student.id === id) {
        const update = {
          name: req.body.name,
          password: req.body.password,
        };

        const options = {
          new: true,
          select: {
            password: 0,
          },
        };

        student = await Candidate.findByIdAndUpdate(id, update, options);

        return res.status(200).json({
          message: 'Student updated sucessfully!',
          student: student,
        });
      } else {
        return res.status(401).json({
          message: 'UnAuthorized | You can not update the student',
        });
      }
    } catch (error) {
      console.log('**** UPDATE STUDENT API ****', error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);

module.exports = router;
