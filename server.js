const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()

const StudentRoute = require('./routes/student')
const TeacherRoute = require('./routes/teacher')
const SchoolRoute = require('./routes/school')
const AuthRoute = require('./routes/auth')
const SubjectRoute = require('./routes/subject')
const RemarkRoute = require('./routes/remark')
const AcademicDetailsRoute = require('./routes/academicDetails')
const AttendanceRoute = require('./routes/attendance')
//mongoose.connect('mongodb://0.0.0.0:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})

 mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})





//mongoose.connect('mongodb://localhost:27017')
const cors = require('cors');
const db = mongoose.connection

db.on('error',(err) => { 
    console.log(err)
})

db.once('open',() => {
    console.log('Database connection Established!')
})

const app = express()
app.use(cors({
    origin: '*'
  }));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(multer().array())
app.use(express.static('public'));



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/student', StudentRoute)
app.use('/api/teacher', TeacherRoute)
app.use('/api/school', SchoolRoute)
app.use('/api/subject', SubjectRoute)
app.use('/api/remark', RemarkRoute)
app.use('/api/academicDetails', AcademicDetailsRoute)
app.use('/api/attendance', AttendanceRoute)
app.use('/', AuthRoute)


