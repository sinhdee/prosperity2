const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req,res) => {
    try{
        const users = await User.find({'applications.status': 'interviewing'});

        const interviews = users.flatMap(user =>
             user.applications.filter(app => app.status === 'interviewing' || 'accepted' || 'rejected')
        );
        if (interviews.length === 0) {
            return res.status(400).send('no interviews');
        }
        res.render('interviews/index',{applications: interviews});

    } catch (error){
        console.error(error);
        res.status(500).send('error fetching interviews')
    }
});


module.exports = router;