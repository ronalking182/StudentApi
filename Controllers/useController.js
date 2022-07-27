const User = require('../models/userModel')
const {validationResult} = require('express-validator')
const ErrorModel = require('../models/ErrorModel');
const jwt = require('jsonwebtoken')


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const SignUpUser = async (req, res) => {
    const {name, email, password} = req.body
    const error = validationResult(req)
    if(!error.isEmpty()) {
        throw new ErrorModel('please fill in the required filed properly', 422)
    }
    try {
      const user =  await User.SignUp(email, password, name)
      const token = createToken(user._id)
      res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


exports.SignUpUser = SignUpUser