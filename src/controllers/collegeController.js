const CollegeModel = require('../models/CollegeModel')
const InternModel = require('../models/InternModel')

const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) === 'string' || "Array" || URL && value.length > 0) {
        return true
    }
}





const createcollege = async function (req, res) {
    try {
        let data = req.body
const { name, fullName, logoLink } = data

if(Object.keys(data)==0){
    return res.status(400).send({ status: false, msg: " data is  missing" })
  }

const req0 = isValid(name)
if (!req0) return res.status(400).send('name is require')
const req1 = isValid(fullName)

if (!req1) return res.status(400).send('fullName require')
const req2 = isValid(logoLink)
if (!req2) return res.status(400).send('logoLink require')

if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(logoLink))) {
    return res.status(400).send({ status: false, message: "please enter a valid logo link" })
  }


let collegeCreated = await CollegeModel.create(data)
res.status(201).send({status: true,data: collegeCreated})
} catch (error) {
 res.status(500).send({ status: false, msg: error.message });
}
}

module.exports.createcollege = createcollege;


const getCollege = async function(req,res){
    try{
       const collegeName = req.query.collegeName
    
       if(!isValid(collegeName)){
        return res.status(400).send({status : false, message: "please provide collegeName"})
    }




       if(!collegeName){return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid collegeName"})}
       const college =await CollegeModel.find({ name:collegeName, isDeleted: false })
       if (!college) {
          return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
        }
         console.log(college)
        const collegeId = college[0]._id
      //   delete req.body["collegeName"]
        
          const interName = await InternModel.find({collegeId: collegeId, isDeleted : false})
          if(interName.length <= 0){res.status(404).send({msg: `No intern apply for this college: ${college} `})}
          const interns =[]
    
          for (let i=0; i<interName.length;i++)
          {
              let Object={}
              Object._id = interName[i]._id
              Object.name=interName[i].name
              Object.email = interName[i].email
              Object.mobile=interName[i].mobile
              interns.push(Object)
          }
    
          const ObjectData = {
              name:college[0].name,
              fullName:college[0].fullName,
              logoLink:college[0].logoLink,
              interest:interns
          }
          
        return res.status(201).send({ status: true, count : interns.length, msg:ObjectData })
    
    
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
    }

    module.exports.getCollege=getCollege;






// const getCollege= async function(req,res){
//     try{
//     const collegeNameToGetdetails= req.query.collegeName
  
//     if(!isValid(collegeNameToGetdetails)){
//       return res.status(400).send({ status: false, message: "please enter college name in query parameter" })
//     }
//     const collegeData= await CollegeModel.findOne({name:collegeNameToGetdetails, isDeleted:false})
//     if(!isValid(collegeData)){
//       return res.status(400).send({ status: false, message: "no such college found" })
//     }
  
//     const collegeId=collegeData._id
//     let internDetails= await InternModel.find({collegeId:collegeId, isDeleted:false})
//     .select({name:1,email:1,mobile:1})
    
//     let collegeDetails={
//       name:collegeData.name,
//       fullName:collegeData.fName,
//       logoLink:collegeData.logoLink,
//       intersts:internDetails
//     }
  
//     return res.status(200).send({ status: true, data:collegeDetails})
//   }
//   catch(err)
//   {
//     return res.status(500).send({status:false, message:err.message})
//   }
//   }
 
//   module.exports.getCollege=getCollege;







// const getCollege = async function (req, res) {
//     try {
//         const data = req.query


//         const details = await CollegeModel.findOne({data})
//         if (details.length == 0) return res.status(404).send({ status: false, msg: "No details Available." })

//         if(!details) return res.status(400).send("your college is not there in the list")

//         let clgdetails =  details._id

//         let internlist = await InternModel.find({clgdetails})
//         res.status(201).send({ msg: details, interest: internlist });
//     }catch (error) {
//         res.status(500).send({ status: false, msg: error.message });
//     }
// }

// module.exports.getCollege=getCollege;



