const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remarkSchema = new Schema({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    remarkName: {
        type: String
    }
}, {timeStamps: true})


const Remark = mongoose.model('Remark', remarkSchema)

module.exports = Remark


