const Student = require('../models/Student');
const Subject = require('../models/Subject');

const SubjectChecker = (subjectId) => {
    return new Promise((resolve, reject) => {
        Subject.findById(subjectId)
            .then((subject) => {
                if (subject) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch((error) => {
                console.error(error);
                reject();
            });
    });
}

module.exports = {SubjectChecker};