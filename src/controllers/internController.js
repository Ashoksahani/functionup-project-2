//const { count } = require("console")
const InternModel= require("../models/InternModel")
const CollegeModel=require("../models/CollegeModel")


const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) === 'string' || "Array" && value.length > 0) {
        return true
    }
}

const createintern = async function (req, res) {
    try {
        let intern = req.body
        let mobile2 = intern.mobile
        let id = intern.collegeId
        

        const { name,mobile,email,} = intern
        if(Object.keys(intern)==0){
            return res.status(400).send({ status: false, msg: " data is  missing" })
          }

        const req0 = isValid(name)
        if (!req0) return res.status(400).send('name is require')

        const req1 = isValid(mobile)
        if (!req1) return res.status(400).send('mobile require')

        if(mobile.length !=10) return res.status(400).send("invalid mobile number")

        const req2 = isValid(email)
        if (!req2) return res.status(400).send('email require')

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))){
            return res.status(400).send("email address is not valid")
        }

        

    let id2 = await CollegeModel.findById(id)
    if(!id2) return res.status(400).send("college is not there in the list")


        let internCreated = await InternModel.create(intern)
    res.status(201).send({status: true, data: internCreated})
} catch (error) {
    res.status(500).send({ status: false, msg: error.message });
}
}

module.exports.createintern = createintern;

// const createintern = async function (req,res){
//     try{
//         const data = req.body
//         if(!data.collegeName){
//             return res.status(400).send({status:false,msg:"Enter the college name"})
//         }
//         const college = await CollegeModel.findone({fullName:data.collegeName})
//         if(!college){
//             return res.status(400).send({status:false,msg:"Enter a real valid college Name"})
//         }
//         data.collegeId = college._id
//         const intern = await InternModel.create(data)
//         res.status(201).send({status:true,data:intern})
//     }catch{
//         res.status(400).send({status:false,message:e.message})    
//     }
// }
// module.exports.createintern = createintern;









