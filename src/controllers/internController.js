const InternModel=require("../models/InternModel")
const CollegeModel = require("../models/CollegeModel")
const mongoose = require('mongoose')

const isValid = function(value){
    if(typeof (value) === 'undefined' || value === null) return false
    if(typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}


const isValidIdType = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
    }

const createintern = async function (req,res){
    try{
  
        const data=req.body

        const{name, email, mobile, collegeId} = data

        if(Object.keys(data)==0){
            return res.status(400).send({status:false,msg:"data is missing please the data to create"})
         }

         if(!isValid(name)){
            return res.status(400).send({status : false, message: "name is required"})
        }

        if(!isValid(email)){
            return res.status(400).send({status : false, message: "email is required"})
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({status: false, message: " please enter a valid email id"})
        }

        const isEmailNotUnique = await InternModel.findOne({email : email})

        if(isEmailNotUnique){
        return res.status(400).send({status: false, message: "email id is already exist"})
        }


        if(!isValid(mobile)){
            return res.status(400).send({status : false, message: "mobile is required"})
        }

        
        
        if(! /^[6-9]\d{9}$/.test(mobile)){
            return res.status(400).send({status: false, message: "enter a valid mobile number indian no"})
        }   
        
        const ismobileUnique = await InternModel.findOne({mobile : mobile})

        if(ismobileUnique){
        return res.status(400).send({status: false, message: "mobile no is already exist"})
        }

        if(!isValid(collegeId)){
            return res.status(400).send({status : false, message: "collegeId is required"})
        }

        if(!isValidIdType(collegeId)){
            return res.status(400).send({status : false, message: "collegeId is not correct"})
        }

        const college = await CollegeModel.findById({ _id:collegeId})
        
        if(!college){
        return res.status(404).send({status: false, message: "collegeid  is no exist"})
        }
         
        const createinterns= await InternModel.create(data)
        res.status(201).send({status: true, message: "createinterns", data : createinterns})

    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }

}

module.exports.createintern=createintern