const collegeModel=require('../Models/CollegeModel')
const mongoose=require('mongoose')

const createCollege=async function (req,res){
    let data=req.body
    if (Object.keys(a).length != 0) {
        

    }
    else {
        return res.status(400).send({ status: false, msg: "BAD REQUEST" })
    }
    let savedDate = await collegeModel.create(data)
     res.status(201).send({ status: true, data: savedDate })
}

module.exports.createCollege=createCollege


