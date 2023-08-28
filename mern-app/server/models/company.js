const mongoose = require('mongoose');
const companiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    lastDate: {
      type: Date,
    },
    package: {
      type: Number,
      required: true,
    },
    candidates: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Candidate', // ref value must be match with the collection name.
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose.model() :- compiles the schema and also add functions in the Model
// 1st argu:- collection name
// 2nd argu:- schema
const Company = mongoose.model('Company', companiesSchema);
module.exports = Company;
