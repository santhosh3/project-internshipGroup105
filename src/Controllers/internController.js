const internModel = require('../Models/internModel')
const mongoose = require('mongoose')
const CollegeModel = require('../Models/CollegeModel')
const { find } = require('../Models/internModel')


const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            const { email, mobile, collegeName } = data;
            if (data.name == undefined || data.email == undefined || data.mobile == undefined || data.name.trim().length == 0
                || data.email.trim().length == 0 || data.mobile.trim().length == 0) {
                return res.status(400).send({ status: false, msg: "Mandatory field missing" })
            }
            let checkEmail = await internModel.findOne({ email: data.email })
            if (checkEmail) return res.status(400).send({status:false, msg: "Email already exist" })

            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
                return res.status(400).send({ status: false, message: 'email should be a valid email address' })
            }
            let checkMobile = await internModel.findOne({ mobile: data.mobile })
            if (checkMobile) return res.status(400).send({ status: false,msg: "Mobile Number already exist" })

            if (!/^[2-9]\d{9}$/.test(mobile)) {
                return res.status(400).send({ status: false, msg: "Enter a valid mobile number" })
            }

            let  Name = await CollegeModel.findOne({name : data.collegeName, isDeleted : false})
            if (!Name) return res.status(400).send({status : false, msg: "college not found"})

            data.collegeId = Name._id

        }
        else {
            res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        let savedDate = await internModel.create(data)
        return res.status(201).send({ status: true, data: savedDate })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createIntern = createIntern

const getInterns = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please Enter the College Name" })
        }
        const find = await CollegeModel.findOne({ name: collegeName })
        if (!find) {
            return res.status(404).send({ status: false, msg: "No College Found" })
        }
        if (find.isDeleted == true) {

            return res.status(404).send({ status: false, msg: "The college data might be deleted" })
        }
        const collegeId = find._id

        const interns = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

        if (interns.length == 0) {
            return res.status(404).send({ status: false, msg: "No Interns found" })
        }

        const collegeData = {
            name: find.name,
            fullName: find.fullName,
            logoLink: find.logoLink,
            interests: interns
        }
        return res.status(200).send({ status: true, data: collegeData })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.getInterns = getInterns