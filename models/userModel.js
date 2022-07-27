const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{ 
        type: String, 
        required: true
    },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{ 
        type: String, 
        required: true
    }
})

//hashing password
UserSchema.statics.SignUp = async function(email, password, name) {
    const exists = await this.findOne({email})
    if(exists) {
     throw Error("Email already exists")
    }
 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
 
    const user = this.create({email, password:hash, name})
    return user
 }



module.exports = mongoose.model('User', UserSchema)