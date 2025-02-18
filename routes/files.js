const express = require('express');
const upload = require('../config/multer');
const { uploader } = require('../config/cloudinary');
const router = express.Router();

const createFiles = async (req, res) => {
    console.log(req.file)
    try {
        req.body.imgUrl = {
            url: req.file.path, 
            cloudinary_id: req.file.filename, 
        }
        req.body.owner = req.params.userId
        await Listing.create(req.body)
        res.redirect('/files')
    } catch (error) {
        console.log(error)

    }
}
app.post('/files/:userId', upload.single("imgUrl"), filesCtrl.createListing)



module.exports = router

module.exports = {createFiles}
