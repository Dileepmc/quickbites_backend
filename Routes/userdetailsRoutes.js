const express = require('express');
const Userdetails = require('../Models/userdetails');
const router = express.Router()


router.post('/', async (req, res, next) => {
    try {
        const userdetail = new Userdetails(req.body);
        await userdetail.save()
        res.status(201).json(userdetail)
    }
    catch (err) {
        res.status(500).send('Error occured')
    }

}) 
router.get('/', async (req,res,next) =>{
    try{
        const userdetail = await Userdetails.find();
        res.status(200).json(userdetail)
    }
    catch(err){
        res.status(404).send('data not found ')
    }
})

module.exports = router