const Teacher = require('../models/Teacher')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const CurrSchool = require('../models/CurrSchool')
const School = require('../models/School')

// const teacherRegister = (req, res, next) =>{
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass){
//         if(err){
//             res.json({
//                 error:err
//             })
//         }
//         let teacher = new Teacher({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: hashedPass,
//             schoolId: req.body.schoolId
//         })
//         user.save()
//         .then(user => {
//             res.json({
//                 message: 'User Added Successfully!'
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'An error Occured!'
//             })
//         })
//     })
// }


const teacherLogin = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    Teacher.findOne({$or: [{email:username}, {phone:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
                    let refreshtoken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '168h'})
                    res.json({
                        message: 'Login Successful!',
                        token,
                        refreshtoken,
                        //send user details
                        user
                    })
                }else{
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })

}

const adminRegister = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
      if (err) {
        res.json({
          error: err
        });
      }
  
      let admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass
      });
  
      admin
        .save()
        .then(admin => {
          res.json({
            message: 'Admin added successfully!'
          });
        })
        .catch(error => {
          res.json({
            message: 'An error occurred!'
          });
        });
    });
  };

const adminLogin = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    Admin.findOne({$or: [{email:username}, {phone:username}]})
    .then(admin => {
        if(admin){
            bcrypt.compare(password, admin.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: admin.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
                    CurrSchool.findOne({adminId: admin._id})
                    .then(currSchool => {
                        if(currSchool){
                            School.findOne({_id: currSchool.schoolId})
                            .then(school => {
                                res.status(200).json({
                                    message: 'Login Successful!',
                                    token,
                                    admin,
                                    school
                                })
                            })
                        }else{
                            res.status(200).json({
                                message: 'Login Successful!',
                                token,
                                admin
                            })
                        }
                    })

                    // res.json({
                    //     message: 'Login Successful!',
                    //     token,
                    //     admin
                    // })
                    //RES STATUS 200
                    // res.status(200).json({
                    //     message: 'Login Successful!',
                    //     token,
                    //     admin
                    // })
                }else{
                    // res.json({
                    //     message: 'Password does not matched!'
                    // })
                    //RES STATUS 401
                    res.status(401).json({
                        message: 'Password does not matched!'
                    })

                }
            })
        }else{
            // res.json({
            //     message: 'No admin found!'
            // })
            //RES STATUS 404
            res.status(404).json({
                message: 'No User found!'
            })
        }
    })

}




module.exports = {
    teacherLogin, adminRegister, adminLogin
}