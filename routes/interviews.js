const express = require('express');
const router = express.Router();
const applications = require('../models/application');

router.get('/',async (req,res) => {
    try {
        const application = await applications.find()
        res.render('interviews/index',{application});
        console.log()
    } catch (error){
        console.error(error)
        res.status(500).send("error fetching interviews");
    }
});


module.exports = router;
