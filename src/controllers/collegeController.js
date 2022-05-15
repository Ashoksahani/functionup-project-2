const CollegeModel = require("../models/CollegeModel")
const InternModel= require("../models/InternModel")


const isValid = function(value){
    if(typeof (value) === 'undefined' || value === null) return false
    if(typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}

const  createcollege = async function(req,res){
    try{
    const data = req.body

    const{name,fullName,logoLink} = data

    if(Object.keys(data)==0){
        return res.status(400).send({status:false, msg:"data is missing please the data to create"})
     }

     if(!isValid(name)){
        return res.status(400).send({status : false, message: "name is required"})
    }


    const names = await CollegeModel.findOne({name : name})

        if(names){
        return res.status(400).send({status: false, message: "name id is already exist"})
        }

    
    if(!isValid(fullName)){
        return res.status(400).send({status : false, message: "fullname is required"})
    }

    
    if(!isValid(logoLink)){
        return res.status(400).send({status : false, message: "logoLink is required"})
    }

    if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(logoLink))) {
    return res.status(400).send({ status: false, message: "please enter a valid logo link" })
  }


  const newCollegeEntry =  await CollegeModel.create(data)
  res.status(201).send({status: true, message: "New College entry", data : newCollegeEntry }) 


    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }

}

const getcollegedetails = async function(req,res){
    try{
        const data=req.query

        const {collegeName}=data
        
        if(!isValid(collegeName)){
            return res.status(400).send({status : false, message: "please provide collegeName"})
        }

        const collegeByCollegeName = await CollegeModel.findOne({name : collegeName})

        if(!collegeByCollegeName) {
            return res.status(404).send({status: false, message: "invalid collegeName"})
        }

        const collegeID = collegeByCollegeName._id

        const getInternsByCollegeID = await InternModel.find({collegeId : collegeID }).select({_id: 1, email: 1, name: 1, mobile: 1})
       

      const {name, fullName, logoLink} = collegeByCollegeName

      const datas = {
                    name: name,
                    fullName : fullName,
                    logoLink : logoLink,
                    interns : getInternsByCollegeID
                 }

        res.status(200).send({status: true, data: datas})




    }catch(error){
        res.status(500).send({status:false, msg :error.message})
    }
}


module.exports.createcollege=createcollege
module.exports.getcollegedetails=getcollegedetails