const express = require('express');
const upload = require('../config/multer');
const { uploader } = require('../config/cloudinary');
const router = express.Router();

const createFiles = async (req, res) => {
    console.log(req.file)
    try {
        // req.body.owner = req.session.user._id
        req.body.imgUrl = {
            url: req.file.path, // Cloudinary URL
            cloudinary_id: req.file.filename, // Cloudinary public ID
        }
        req.body.owner = req.params.userId
        await Listing.create(req.body)
        res.redirect('/files')
    } catch (error) {
        console.log(error)

    }
}
app.post('/files/:userId', upload.single("imgUrl"), filesCtrl.createListing)
// router.post('/files', upload.single('file'), (req,res) => {
//     if (!req.file){
//         return res.status(400).json({error:"no file uploaded"});
//     }
//     const fileUrl = req.file.path;
//     res.status(200).json({sucess:true, fileUrl});
// })


module.exports = router

module.exports = {createFiles}
