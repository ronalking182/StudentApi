const ErrorModel = require('../models/ErrorModel');
const Student = require('../models/StudentsModel')
const { validationResult } = require('express-validator');


/*
==============================================
Controller Type: find all students
==============================================
*/
const displayStudents = async (req, res, next) => {
    const students = await Student.find()
    console.log(students)
        res.status(200).json(students)
}


/*
==============================================
Controller Type: find student by id
==============================================
*/
const getStudentById = async (req, res, next) => {
   const studentsId = req.params.id

   let student
   try{
         student = await Student.findById(studentsId)
   }catch(err){
    const error = new ErrorModel("something went wrong",500)
    throw error
   }
   res.json({ student: student.toObject({ getters: true }) });
}

/*
==============================================
Controller Type: create student
==============================================
*/
const CreateStudent = async (req, res, next) => {
    const {name, age, address} = req.body
    //request error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new ErrorModel("Invalid Input, entered data is incorrect", 422)
        throw error
    }
    let student = new Student({
        name,
        age,
        address
    });

   const result = await student.save()
        .then(student => {
            res.status(200).json({'student': 'student added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new student failed');
        });
}

/*
==============================================
Controller Type: update student
==============================================
*/
const UpDateStudent = async (req, res, next) => {
    const studentsId = req.params.id
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const error = new ErrorModel("Please update all student filed properly ", 422)
        throw error
    }
    const {name, age, address} = req.body
   let studentToUpdate
   try{
         studentToUpdate = await Student.findById(studentsId)
   }catch(err){
    const error = new ErrorModel("something went wrong",500)
    throw error
   }
    studentToUpdate.name = name
    studentToUpdate.age = age
    studentToUpdate.address = address

    try {
        await studentToUpdate.save()
    } catch (err) {
        const error = new ErrorModel("something went wrong",500)
        throw next(error)
    }
    // res.status(200).json({ message: 'Student updated successfully' });
    res.status(200).json({ student: studentToUpdate.toObject({ getters: true }) });
}


/*
==============================================
Controller Type: delete student
==============================================
*/
const DeleteStudent = async(req, res, next) => {
    const studentsId = req.params.id
    let studentToDelete
    //find the student by id
    try{
         studentToDelete = await Student.findById(studentsId)
    }catch(err){
        const error = new ErrorModel("something went wrong",500)
        throw error
    }
      //check if student exists
    if(!studentToDelete){
        const error = new ErrorModel("Student not found",404)
        throw error
    }
    // DeleteStudent
    try {
        await studentToDelete.remove()
    } catch (err) {
        const error = new ErrorModel("something went wrong",500)
        throw next(error)
    }
    res.status(200).json({ message: 'Student deleted successfully' });
}

exports.displayStudents= displayStudents
exports.DeleteStudent = DeleteStudent
exports.getStudentById = getStudentById
exports.CreateStudent = CreateStudent
exports.UpDateStudent = UpDateStudent



