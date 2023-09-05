const Student = require('../models/Student')
const {SubjectChecker} = require('../utils/MatchSubject');

//Show list of students
const index = (req, res, next) => {
    Student.find()
    .then(response=> {
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

//Show single Student
const show = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findById(studentId)
    .then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            message: 'An error Ocuured!'
        })

    })
}

//store new Student
const store = (req, res, next) => {
    let student = new Student({
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        dob: req.body.dob,
        address: req.body.address,
        schoolId: req.body.schoolId,
        subjectIds: req.body.subjectIds
    })
    student.save()
    .then(response=>{
        res.json({
            message: 'Student Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
    // let subjectIds = req.body.subjectIds;
    // console.log(subjectIds)
    // //USE TRY CATCH BLOCK
    // try {
    //     //if subjectIds is is [] or null or subjectsIds are present in the database then only save the student
    //     if (subjectIds.length == 0 || subjectIds.every((subjectId) => {
    //         SubjectChecker(subjectId)
    //     })) {
    //         console.log('inside if')
    //         let student = new Student({
    //             name: req.body.name,
    //             class: req.body.class,
    //             age: req.body.age,
    //             dob: req.body.dob,
    //             address: req.body.address,

    //             schoolId: req.body.schoolId,
    //             subjectIds: req.body.subjectIds
    //         })
    //         console.log('student')
    //         console.log(student)
    //         student.save()
    //             .then(response => {
    //                 res.json({
    //                     message: 'Student Added Successfully!'
    //                 })
    //             })
    //             .catch(error => {
    //                 res.json({
    //                     message: 'An error Occured!'
    //                 })
    //             })
    //     } else {
    //         res.json({
    //             message: 'Subject not found!'
    //         })
    //     }
    // }
    // catch (error) {
    //     res.json({
    //         message: 'An error Occured!'
    //     })
    // }
}
// const store = (req, res, next) => {
//     try {
//         const subjectIds = req.body.subjectIds;

//         // Check if subjectIds is an array and not empty
//         if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
//             return res.json({ message: 'Subject IDs are empty or not an array.' });
//         }

//         // Flag to keep track of subject existence
//         let allSubjectsExist = true;

//         // Check each subjectId one by one
//         for (const subjectId of subjectIds) {
//             const subjectExists = SubjectChecker(subjectId);
//             if (!subjectExists) {
//                 allSubjectsExist = false;
//                 res.json({ message: 'Subject not found!' });
//                 break;

//             }
//         }
//         if (allSubjectsExist) {
//             // If all subjects exist in the database, save the student
//             const student = new Student({
//                 name: req.body.name,
//                 class: req.body.class,
//                 age: req.body.age,
//                 dob: req.body.dob,
//                 address: req.body.address,
//                 schoolId: req.body.schoolId,
//                 subjectIds: req.body.subjectIds
//             });

//             student.save()
//                 .then(response => {
//                     res.json({
//                         message: 'Student Added Successfully!'
//                     });
//                 })
//                 .catch(error => {
//                     res.json({
//                         message: 'An error Occurred!'
//                     });
//                 });
//         } else {
//             res.json({
//                 message: 'Subject not found!'
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.json({
//             message: 'An error Occurred!'
//         });
//     }
// };



//update a student
const update = (req, res, next) => {
    let studentId = req.body.studentId
    let updateData = {
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        dob: req.body.dob,
        address: req.body.address,
        schoolId: req.body.schoolId,
        subjectIds: req.body.subjectIds
    }
    console.log(updateData)
    Student.findByIdAndUpdate(studentId, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Student updated successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an student
const destroy = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findByIdAndRemove(studentId)
    .then(()=>{
        res.json({
            message: 'Student deleted successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}