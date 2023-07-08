const School = require('../models/School');
const CurrSchool = require('../models/CurrSchool');
const { response } = require('express');

// Show list of schools
const index = (req, res, next) => {
  //   console.log(req.body);
  //   School.find({adminId: req.body.adminId})
  //     .then(response => {
  //       res.json({
  //         schools: response
  //       });
  //     })
  //     .catch(error => {
  //       res.json({
  //         message: 'An error occurred!'
  //       });
  //     });
  // };
  console.log(req.headers);
  if (req.body.adminId) {
    School.find({ adminId: req.body.adminId })
      .then(response => {
        res.json({
          schools: response
        })
      })
      .catch(error => {
        res.json({
          message: 'An error occurred!'
        })
      })
  } else {
    //no adminId response
    res.json({
      message: 'No adminId'
    })
  }
};


// Show single school if adminId matches
const show = (req, res, next) => {
  let schoolId = req.body.schoolId;
  let adminId = req.body.adminId;
  console.log(schoolId);
  console.log(adminId);

  School.find({ _id: schoolId, adminId: adminId })
    .then(response => {
      if (response.length > 0) {
        res.json({
          school: response
        });
      } else {
        res.json({
          message: 'School Not found.',
          schoolId: schoolId,
          adminId: adminId
        });
      }
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};





// Store a new school
const store = (req, res, next) => {
  let school = new School({
    name: req.body.name,
    location: req.body.location,
    adminId: req.body.adminId
  });
  school
    .save()
    // .then(response => {
    //   //update currSchool
    //   let currSchool = new CurrSchool({
    //     schoolId: response._id,
    //     adminId: response.adminId
    //   });
    //   currSchool
    //     .save()
    //     .then(response => {

    //   res.json({
    //     message: 'School added successfully!'
    //   });
    .then(responseA => {
      let currSchool = new CurrSchool({
        schoolId: responseA._id,
        adminId: responseA.adminId
      });
      currSchool
        .save()
        .then(response => {
          res.json({
            message: 'School added successfully!',
            school: responseA
          });
        }
        )


    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Update a school
const update = (req, res, next) => {
  let schoolId = req.params.id;
  let updateData = {
    name: req.body.name,
    location: req.body.location,
    adminId: req.body.adminId
  };

  School.findByIdAndUpdate(schoolId, { $set: updateData })
    .then(() => {
      res.json({
        message: 'School updated successfully!'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Delete a school
// const destroy = (req, res, next) => {
//   let schoolId = req.params.id;
//   School.findByIdAndRemove(schoolId)
//     .then(() => {
//       res.json({
//         message: 'School deleted successfully!'
//       });
//     })
//     .catch(error => {
//       res.json({
//         message: 'An error occurred!'
//       });
//     });
// };
//delete a school if adminId matches
const destroy = (req, res, next) => {
  let schoolId = req.params.schoolId;
  let adminId = req.params.adminId;
  School.findOneAndRemove({ adminId: adminId, _id: schoolId })
    .then(() => {
      res.json({
        message: 'School deleted successfully!'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

const CurrSchoolSet = (req, res, next) => {
  let schoolId = req.body.schoolId;
  let adminId = req.body.adminId;
  let currSchool = new CurrSchool({
    schoolId: schoolId,
    adminId: adminId
  });
  currSchool
    .save()
    .then(response => {
      res.json({
        message: 'CurrSchool added successfully!'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

const UpdateCurrSchool = (req, res, next) => {
  let schoolId = req.body.schoolId;
  let adminId = req.body.adminId;
  let updateData = {
    schoolId: schoolId,
    adminId: adminId
  };
  CurrSchool.findOneAndUpdate({ adminId: adminId }, { $set: updateData })
    .then(() => {
      School.findById(schoolId)
        .then(response => {
          res.json({
            message: 'CurrSchool updated successfully!',
            school: response
          });
        })
        .catch(error => {
          res.json({
            message: 'An error occurred!'
          });
        });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};



module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  CurrSchoolSet,
  UpdateCurrSchool
};
