const express = require('express');
const router = express.Router();
const Candidate = require('../../models/candidate');

router.get('/', async function callback(req, res) {

  try {
    const students = await Candidate.find({});

    return res.status(200).json({
      message: "Students fetched successfully!",
      data: students
    });

  } catch (error) {
    console.log("**** GET ALL STUDENT API ****", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
  
});

router.post('/', async function callback(req, res) {

  try {
    const isStudentExists = await Candidate.find({ email: req.body.email });

    if (isStudentExists.length != 0) {
      return res.status(403).json({
        message: "Student Already exist!"
      });
    }

    const student = await Candidate.create(req.body);

    // console.log(req.body);
    // students.push(req.body);

    return res.status(200).json({
      message: "Student created successfully!",
      data: student
    });
    
  } catch (error) {
    console.log("**** CREATE STUDENT API ****", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

router.put('/:id', async function callback(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).json({
        message: "Please provide valid id"
      });
    }
    
    let student = await Candidate.findById(id);

    if (student) {

      const update = {
        name: req.body.name,
        password: req.body.password
      }

      const options = {
        new: true
      }

      student = await Candidate.findByIdAndUpdate(id, update, options);

      return res.status(200).json({
        message: "Student updated sucessfully!",
        student: student
      });
   } else {
       return res.status(403).json({
         message: "Student not found!"
       });
   }
  } catch (error) {
    console.log("**** UPDATE STUDENT API ****", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

module.exports = router;