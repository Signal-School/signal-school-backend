const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const School = require('../models/School')


const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decode
        next()
    }
    catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired!"
            })
        } else {
            res.json({
                message: 'Authentication Failed!'
            })
        }
    }
}

// const teacherActionAuthenticate = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]
//         const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         req.user = decode
//         //if find teacher details using id and find student details from student id and compare school id
//         Teacher.findById(req.user._id)
//             .then(user => {
//                 if (user) {
//                     Student.findById(req.body.studentId)
//                         .then(student => {
//                             if (student) {
//                                 if (user.schoolId == student.schoolId) {
//                                     next()
//                                 } else {
//                                     res.json({
//                                         message: 'Authentication Failed!'
//                                     })
//                                 }
//                             } else {
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         })
//                 } else {
//                     res.json({
//                         message: 'Authentication Failed!'
//                     })
//                 }
//             }

//             )
//     }
//     catch (error) {
//         if (error.name == "TokenExpiredError") {
//             res.status(401).json({
//                 message: "Token Expired!"
//             })
//         } else {
//             res.json({
//                 message: 'Authentication Failed!'
//             })
//         }
//     }

// }


// const adminActionAuthenticate = (req, res, next) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1]
//         const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         req.user = decode
//         if(req.body.teacherId){
//             Teacher.findById(req.body.teacherId)
//             .then(user => {
//                 if(user){
//                     School.findById(user.schoolId)
//                     .then(school => {
//                         if(school){
//                             if(school.adminId == req.user.adminId){
//                                 next()
//                             }else{
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         }else{
//                             res.json({
//                                 message: 'Authentication Failed!'
//                             })
//                         }
//                     }
//                     )
//                 }else{
//                     res.json({
//                         message: 'Authentication Failed!'
//                     })
//                 }
//             }

//             )
//         }else if(req.body.schoolId){
//             School.findById(req.body.schoolId)
//             .then(school => {
//                 if(school){
//                     if(school.adminId == req.user.adminId){
//                         next()
//                     }else{
//                         res.json({
//                             message: 'Authentication Failed!'
//                         })
//                     }
//                 }else{
//                     res.json({
//                         message: 'Authentication Failed!'
//                     })
//                 }
//             }
//             )
//         }else if(req.body.studentId){
//             Student.findById(req.body.studentId)
//             .then(student => {
//                 if(student){
//                     School.findById(student.schoolId)
//                     .then(school => {
//                         if(school){
//                             if(school.adminId == req.user.adminId){
//                                 next()
//                             }else{
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         }else{
//                             res.json({
//                                 message: 'Authentication Failed!'
//                             })
//                         }
//                     }
//                     )
//                 }else{
//                     res.json({
//                         message: 'Authentication Failed!'
//                     })
//                 }
//             }

//             )
//         }else{
//             res.json({
//                 message: 'Authentication Failed!'
//             })
//         }
//     }
//     catch (error) {
//         if (error.name == "TokenExpiredError") {
//             res.status(401).json({
//                 message: "Token Expired!"
//             })
//         } else {
//             res.json({
//                 message: 'Authentication Failed!'
//             })
//         }
//     }
// }

// module.exports = {
//     authenticate,
//     teacherActionAuthenticate,
//     adminActionAuthenticate
// }


// const authenticate = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]
//         const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         req.user = decode
//         if(req.user.role == 'admin'){
//             if(req.user.teacherId){
//                 Teacher.findById(req.user.teacherId)
//                 .then(user => {
//                     if(user){
//                         School.findById(user.schoolId)
//                         .then(school => {
//                             if(school){
//                                 if(school.adminId == req.user.adminId){
//                                     next()
//                                 }else{
//                                     res.json({
//                                         message: 'Authentication Failed!'
//                                     })
//                                 }
//                             }else{
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         }
//                         )
//                     }else{
//                         res.json({
//                             message: 'Authentication Failed!'
//                         })
//                     }
//                 }

//                 )
//             }else if(req.user.schoolId){
//                 School.findById(req.user.schoolId)
//                 .then(school => {
//                     if(school){
//                         if(school.adminId == req.user.adminId){
//                             next()
//                         }else{
//                             res.json({
//                                 message: 'Authentication Failed!'
//                             })
//                         }
//                     }else{
//                         res.json({
//                             message: 'Authentication Failed!'
//                         })
//                     }
//                 }
//                 )
//             }else if(req.user.studentId){
//                 Student.findById(req.user.studentId)
//                 .then(student => {
//                     if(student){
//                         School.findById(student.schoolId)
//                         .then(school => {
//                             if(school){
//                                 if(school.adminId == req.user.adminId){
//                                     next()
//                                 }else{
//                                     res.json({
//                                         message: 'Authentication Failed!'
//                                     })
//                                 }
//                             }else{
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         }
//                         )
//                     }else{
//                         res.json({
//                             message: 'Authentication Failed!'
//                         })
//                     }
//                 }

//                 )
//             }else{
//                 res.json({
//                     message: 'Authentication Failed!'
//                 })
//             }
//         }else if(req.user.role == 'teacher'){
//             //get teacher school id from teacher id and get studebt school id from student id
//             Teacher.findById(req.user.teacherId)
//             .then(user => {
//                 if (user) {
//                     Student.findById(req.body.studentId)
//                         .then(student => {
//                             if (student) {
//                                 if (user.schoolId == student.schoolId) {
//                                     next()
//                                 } else {
//                                     res.json({
//                                         message: 'Authentication Failed!'
//                                     })
//                                 }
//                             } else {
//                                 res.json({
//                                     message: 'Authentication Failed!'
//                                 })
//                             }
//                         })
//                 } else {
//                     res.json({
//                         message: 'Authentication Failed!'
//                     })
//                 }
//             }

//             )
//     }
//     } catch (error) {
//         if (error.name == "TokenExpiredError") {
//             res.status(401).json({
//                 message: "Token Expired!"
//             })
//         } else {
//             res.json({
//                 message: 'Authentication Failed!'
//             })
//         }
//     }
// }


module.exports = {
    authenticate
}

