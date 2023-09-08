const Subject = require('../models/Subject');
// const School = require('../models/School');
const Remark = require('../models/Remark');
const AcademicDetails = require('../models/AcademicDetails');
// const Student = require('../models/Student');
const { SubjectStudentChecker, SubjectRemarkChecker } = require('./Checker');


exports.StudentDetails = async (studentData) => {
    let subjectList = [];
    try {

        for (let i = 0; i < studentData.subjectIds.length; i++) {
            let subjectData = await Subject.findById(studentData.subjectIds[i]).exec()
            if (subjectData) {
                // console.log(subjectData)
                let subject = {}
                subject["name"] = subjectData.name
                subject["id"] = subjectData._id
                subjectList.push(subject)
            }
        }
        // console.log(subjectList)


        acadDetails = {}
        let acadDetailsData = await AcademicDetails.find({ studentId: studentData._id }).exec()
        // console.log(acadDetailsData.length)
        if (acadDetailsData) {
            // console.log(acadDetailsData)
            for (let i = 0; i < acadDetailsData.length; i++) {
                let subjectData = await Subject.findById(acadDetailsData[i].subjectId).exec()
                let remarkData = await Remark.findById(acadDetailsData[i].remarkId).exec()
                if (subjectData && remarkData) {
                    if (SubjectStudentChecker(acadDetailsData[i].subjectId, acadDetailsData[i].studentId) == true && SubjectRemarkChecker(acadDetailsData[i].subjectId, acadDetailsData[i].remarkId) == true) {
                        console.log("YES")
                        acadDetails[subjectData.name] = {
                            "semester": acadDetailsData[i].semester,
                            "description": acadDetailsData[i].description,
                            "remark": remarkData.name
                        }
                    }
                }
            }
        }
        console.log(acadDetails)

        
        let finalData = {
            "BasicDetails": {
                "name": studentData.name,
                "class": studentData.class,
                "age": studentData.age,
                "dob": studentData.dob,
                "address": studentData.address,
                "subjects": subjectList

            },
            "AcademicDetails": acadDetails
        }
        return (finalData)
    } catch (error) {

    }
}
