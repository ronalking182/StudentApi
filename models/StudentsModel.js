const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentBio = new Schema({
   name:{type:String, required:true},
   age:{type:Number, required:true},
   address: { type: String, required: true },
})
//    image: { type: String, required: true },

module.exports= mongoose.model("Student", StudentBio)
