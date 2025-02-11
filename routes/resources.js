const express = require('express');
const router = express.Router();

router.get('/users/:id/resources', (req, res) => {
    res.render('resources/index')
});

module.exports = router;