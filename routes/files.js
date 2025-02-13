const express = require('express');
const upload = require('../config/multer');
const { uploader } = require('../config/cloudinary');
const router = express.Router();

router.post('/files', upload.fields([
    {name: 'imgUrl1', maxCount:1},
    {name: 'imgUrl2', maxCount:1},
    {name: 'imgUrl3', maxCount:1},
    {name: 'imgUrl4', maxCount:1},
]), async (req,res) => {
    try{
const uploadedFiles = {};

for (const field of ['imgUrl1','imgUrl2','imgUrl3','imgUrl4']) {
    if (req.files[field]) {
        const file = req.files[field][0];
        const results = await cloudinary_js_config.uploader.upload(file.path);

        uploadedFiles[field] = results.secure.url;
        }
}
res.locals.uploadedFiles = uploadedFiles;

res.render('resources/index');
} catch (error) {
    console.error('error uploading to cloudinary', error);
    res.status(500).send('error uploading this file')
}
});


module.exports = router
