// import ErrorModel from '../models/ErrorModel'
// import mongoose from 'mongoose';
const Student = require('../models/StudentsModel')




const displayStudents = async (req, res, next) => {
    const students = await Student.find()
        res.status(200).json(students)
}


const getStudentById = (req, res, next) => {

}

const CreateStudent = async (req, res, next) => {
    const {name, age, address} = req.body

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

const UpDateStudent = async (req, res, next) => {

}

const DeleteStudent = async(req, res, next) => {

}

exports.displayStudents= displayStudents
exports.DeleteStudent = DeleteStudent
exports.getStudentById = getStudentById
exports.CreateStudent = CreateStudent
exports.UpDateStudent = UpDateStudent



