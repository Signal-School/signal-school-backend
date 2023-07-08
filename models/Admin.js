const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    name: {
        type: String 
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    }

}, {timestamps: true})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin
