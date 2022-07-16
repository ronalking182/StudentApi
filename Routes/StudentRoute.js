const studentController =   require('../Controllers/StudentController')

const  express = require('express');



const StudentRoute = express.Router()

StudentRoute.get('/student', studentController.displayStudents)



StudentRoute.get('/student/:id', studentController.getStudentById)



StudentRoute.post('/create', studentController.CreateStudent)



StudentRoute.delete('/student/:id', studentController.DeleteStudent)



StudentRoute.patch('/student/:id', studentController.UpDateStudent)

module.exports = StudentRoute