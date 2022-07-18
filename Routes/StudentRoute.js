const studentController =   require('../Controllers/StudentController')
const { check } = require('express-validator');


const  express = require('express');



const StudentRoute = express.Router()

StudentRoute.get('/student', studentController.displayStudents)



StudentRoute.get('/student/:id', studentController.getStudentById)



StudentRoute.post('/create', [
    check('name', 'name is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty()
], studentController.CreateStudent)



StudentRoute.delete('/student/:id', studentController.DeleteStudent)



StudentRoute.patch('/student/:id', [
    check('name', 'name is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty()
], studentController.UpDateStudent)

module.exports = StudentRoute