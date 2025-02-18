const Files = require('../models/files')

const createFiles = (req,res) =>{
    if (!req.file) {
        return res.status(400).send('no file uploaded')
    }
}


