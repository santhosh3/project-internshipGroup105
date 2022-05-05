const internModel = require('../Models/internModel')
const mongoose = require('mongoose')
const CollegeModel = require('../Models/CollegeModel')
const { find } = require('../Models/internModel')


const createIntern = async function (req, res) {
    let data = req.body
    let mobile = data.mobile
    let ObjectId=data.collegeId
    if (Object.keys(data).length != 0) {
        if (data.name == undefined || data.email == undefined || data.mobile == undefined || data.collegeId == undefined || data.name.trim().length == 0
            || data.email.trim().length == 0 || data.mobile.trim().length == 0) {
            return res.status(400).send({ status: false, msg: "Mandatory field missing" })
        }
        let checkEmail = await internModel.findOne({ email: data.email })
        if (checkEmail) return res.status(400).send({ msg: "Email already exist" })

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            return res.status(400).send({ status: false, message: 'email should be a valid email address' })
        }
        let checkMobile = await internModel.findOne({ mobile: data.mobile })
        if (checkMobile) return res.status(400).send({ msg: "Mobile Number already exist" })

        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, msg: "Enter a valid mobile number" })
        }

        let checkName = await internModel.findOne({ name: data.name })
        if (checkName) return res.status(400).send({ msg: "Name already exist" })
        
        
              if (!mongoose.Types.ObjectId.isValid(ObjectId)) {
                return res.status(400).send({status:false,msg:"Invalid CollegeId"});
            }

            let collegeId = await CollegeModel.findById(ObjectId);
            if (!collegeId) {
                return res.status(404).send({ status: false, msg: "The CollegeId is not found" });
            } 

    }
    else {
        res.status(400).send({ status: false, msg: "BAD REQUEST" })
    }
    let savedDate = await internModel.create(data)
    return res.status(201).send({ status: true, data: savedDate })
}

module.exports.createIntern = createIntern

const getInterns = async function(req,res){
    try {
       const collegeName = req.query.name
       if(!collegeName){
           return res.status(400).send({status:false, msg: "Please Enter the College Name"})
       }
   const find =await CollegeModel.findOne({name:collegeName})
   if(!find){
    return res.status(404).send({status:false, msg: "No College Found"}) 
   }
   const collegeId = find._id
   const interns= await internModel.find({collegeId:collegeId}).select({name:1,email:1,mobile:1})
   if(interns.length ==0){
    return res.status(404).send({status:false, msg: "No Intern applied for internship at this college"})  
   }
   const collegeData ={
       name: find.name,
       fullName: find.fullName,
       logoLink: find.logoLink,
       interest: interns 
   }
    return res.status(200).send({status:true, data: collegeData})
   
    } catch (error) {
       return res.status(500).send({status:false, msg: error.message}) 
    }   
   }

module.exports.getInterns = getInterns