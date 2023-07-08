const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');

// Show list of teachers
const index = (req, res, next) => {
  // Teacher.find()
  //   .then(response => {
  //     res.json({
  //       teachers: response
  //     });
  //   })
  //   .catch(error => {
  //     res.json({
  //       message: 'An error occurred!'
  //     });
  //   });
  //if school id of teacher is same 
  let schoolId = req.body.schoolId;
  Teacher.find({ schoolId: schoolId })
    .then(response => {
      res.json({
        teachers: response
      });
    }
    )
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    }
    );
    

};

// Show single teacher
const show = (req, res, next) => {
  let teacherId = req.params.id;
  Teacher.findById(teacherId)
    .then(response => {
      res.json({
        teacher: response
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Store a new teacher
const store = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
    if (err) {
      res.json({
        error: err
      });
    }
    let teacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
      schoolId: req.body.schoolId
    });
    teacher
      .save()
      .then(response => {
        res.json({
          message: 'Teacher added successfully!'
        });
      })
      .catch(error => {
        res.json({
          message: 'An error occurred!'
        });
      });
  });
};

// Update a teacher
const update = (req, res, next) => {
    let teacherId = req.params.id;
    let updateData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      schoolId: req.body.schoolId
    };
  
    if (req.body.password) {
      // Hash the new password
      bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
          res.json({
            message: 'An error occurred!'
          });
        }
        updateData.password = hashedPass;
  
        // Update the teacher with hashed password
        Teacher.findByIdAndUpdate(teacherId, { $set: updateData })
          .then(() => {
            res.json({
              message: 'Teacher updated successfully!'
            });
          })
          .catch(error => {
            res.json({
              message: 'An error occurred!'
            });
          });
      });
    } else {
      // Update the teacher without changing the password
      Teacher.findByIdAndUpdate(teacherId, { $set: updateData })
        .then(() => {
          res.json({
            message: 'Teacher updated successfully!'
          });
        })
        .catch(error => {
          res.json({
            message: 'An error occurred!'
          });
        });
    }
  };

// Delete a teacher
const destroy = (req, res, next) => {
  let teacherId = req.params.id;
  Teacher.findByIdAndRemove(teacherId)
    .then(() => {
      res.json({
        message: 'Teacher deleted successfully!'
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
  destroy
};
