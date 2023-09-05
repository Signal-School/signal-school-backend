const Subject = require('../models/Subject')

//Show list of subjects
const index = (req, res, next) => {
    Subject.find()
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

//Show single Subject
const show = (req, res, next) => {
    let subjectId = req.body.subjectId
    Subject.findById(subjectId)
    .then(response=>{
        res.json({
            response
        })
    }
    ).catch(error=>{
        res.json({
            message: 'An error Ocuured!'
        })

    }
    )
}

// store new Subject
const store = (req, res, next) => {
    let subject = new Subject({
        name: req.body.name,
        details: req.body.details
    })
    subject.save()
    .then(response=>{
        res.json({
            message: 'Subject Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}



// const subjectSchema = new Schema({
//     name: {
//         type: String
//     },
//     details: {
//         type: String
//     }
// })

//update a subject
const update = (req, res, next) => {
    let subjectId = req.body.subjectId
    let updateData = {
        name: req.body.name,
        details: req.body.details
    }
    Subject.findByIdAndUpdate(subjectId, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Subject Updated Successfully!'
        })
    }
    ).catch(error=>{
        res.json({
            message: 'An error Ocuured!'
        })

    }
    )

}

//delete a subject
const destroy = (req, res, next) => {
    let subjectId = req.body.subjectId
    Subject.findByIdAndRemove(subjectId)
    .then(()=>{
        res.json({
            message: 'Subject Deleted Successfully!'
        })
    }
    ).catch(error=>{
        res.json({
            message: 'An error Ocuured!'
        })

    }
    )
}

module.exports = {
    index, show, store, update, destroy
}





