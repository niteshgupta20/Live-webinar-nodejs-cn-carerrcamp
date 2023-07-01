const express = require('express');
const db = require('./config/mongoose');
const Candidate = require('./models/candidate');
const mongoose = require('mongoose');
const PORT = 8000;
const app = express();


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let counter = 0;
// create your own custom middleware
app.use(function (req, res, next) {
  counter++;
  console.log("Request Number: ", counter);
  next();
});

app.get('/', function callback(req, res) {
  var options = {
    root: __dirname
  }
  return res.sendFile('index.html', options);
});


app.get('/home', function callback(req, res) {
  console.log("Query ", req.query);
  return res.send('<h1>Served By ExpressJS!</h1>');
});

app.get('/about/:id', function callback(req, res) {
  console.log(req.params);
  return res.status(200).json({
    id: req.params.id,
    name: 'CN',
    roll: 100
  });
  // return res.send('<h1>About JS</h1>');
});

// CRUD API

// const students = [
//   {
//     name: 'A',
//     roll: 100
//   },
//   {
//     name: 'B',
//     roll: 101
//   },
//   {
//     name: 'C',
//     roll: 102
//   }
// ];

app.get('/student', async function callback(req, res) {

  const students = await Candidate.find({}, {password: 0});

  return res.status(200).json({
    message: "Students fetched successfully!",
    data: students
   });
});

app.post('/student', async function callback(req, res) {

  const isStudentExists = await Candidate.find({ email: req.body.email });

  if(isStudentExists.length != 0){
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
});

app.put('/student/:id', async function callback(req, res) {

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
});

app.listen(PORT, function callback() {
  console.log('Server is running');
});