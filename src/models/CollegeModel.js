const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:"please enter the collegeName",
    },
    fullName:{
        type:String,
        required:"please enter the fullname of college",
        trim:true,
        },
        logoLink:{
        type:String,
        required:"please enter the logoLink",
        trim:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },


},{timestamps:true})

module.exports = mongoose.model('college',collegeSchema)