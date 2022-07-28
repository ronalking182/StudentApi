const express = require('express');
const { check } = require('express-validator');
// const {check} = require('express-validator')
const UserController = require('../controllers/useController')


const UserRouter = express.Router()

UserRouter.post('/signup', [
    check('name', 'name is required').not().isEmpty(),
    check('email','email is required').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
], UserController.SignUpUser)

UserRouter.post('/login', [
    check('name', 'name is required').not().isEmpty(),
    check('email','email is required').normalizeEmail().isEmail(),
], UserController.Login)

module.exports = UserRouter