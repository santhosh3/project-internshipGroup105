const internModel=require('../Models/internModel')
const mongoose=require('mongoose')


const createIntern=async function (req,res){
    let data=req.body
    let savedDate = await internModel.create(data)
     res.status(201).send({ status: true, data: savedDate })
}

module.exports.createIntern=createIntern