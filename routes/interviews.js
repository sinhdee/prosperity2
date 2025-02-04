const express = require('express');
const router = express.Router();
const applications = require('../models/user');

router.get('/users/:userId/interviews',async (req,res) => {
    try {
        const applications = await applications.find({status: 'interviewing'})
        res.render('interviews/index',{applications});
    } catch (error){
        console.error(error)
        res.status(500).send("error fetching interviews");
    }
});




module.exports = router;