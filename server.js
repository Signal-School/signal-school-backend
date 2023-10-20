const DB = require('./models/index');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const AWS = require("aws-sdk");
// const s3 = new AWS.S3()
dotenv.config();



const app = express();
app.use(cors({
    origin: '*'
}));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().array());



const AuthRoute = require('./routes/auth');
const OrganizationRoute = require('./routes/organization');
const SchoolRoute = require('./routes/school');
const TeacherRoute = require('./routes/teacher');
const StudentRoute = require('./routes/student');
const SubjectRoute = require('./routes/subject');
const AcademicYearRoute = require('./routes/academicYear');
const ClassRoute = require('./routes/class');
const StudentSubjectRoute = require('./routes/studentsubject');
const StudentTimelineRoute = require('./routes/studenttimeline');


app.use('/', AuthRoute);
app.use('/', OrganizationRoute);
app.use('/', SchoolRoute);
app.use('/', TeacherRoute);
app.use('/', StudentRoute);
app.use('/', SubjectRoute);
app.use('/', AcademicYearRoute);
app.use('/', ClassRoute);
app.use('/', StudentSubjectRoute);
app.use('/', StudentTimelineRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
