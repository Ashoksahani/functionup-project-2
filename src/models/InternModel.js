const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId
//const validator = require("validator");

const InternSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:"please enter the name",
    },
    email:{
        type:String,
        unique:true,
        required:"please enter the email",
        validate:[/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,"Please enter a valid email"],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is inValid");}}
    },
    mobile:{
        type:String,
        unique:true,
        validate: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Please provide valid mobile number'],
        required:"please enter the mobile number",
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"college",
        required:"please the college Id"
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },

    
    //summary :  mongoose.Schema.Types.Mixed,
    
}, { timestamps: true });


module.exports = mongoose.model('Intern',InternSchema) //users
