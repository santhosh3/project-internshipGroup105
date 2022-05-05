const collegeModel=require('../Models/CollegeModel')
const mongoose=require('mongoose')

const createCollege=async function (req,res){
    let data=req.body
    if (Object.keys(data).length != 0) {
        if(data.name==undefined || data.fullName == undefined || data.logoLink== undefined || data.name.trim().length == 0
        || data.fullName.trim().length == 0 || data.logoLink.trim().length == 0){
            return res.status(400).send({status:false, msg:"Mandatory field missing"})
       }

       let checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) return res.status(400).send({ msg: "College already exist" })
        

        if(! (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(data.logoLink))){
            return res.status(400).send({ status: false, message: 'Please provide valid URL' })
        }

    }
    else {
        return res.status(400).send({ status: false, msg: "BAD REQUEST" })
    }
    let savedDate = await collegeModel.create(data)
     res.status(201).send({ status: true, data: savedDate })
}

module.exports.createCollege=createCollege


