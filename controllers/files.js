const Files = require('../models/files')

const createFiles = (req,res) =>{
    if (!req.file) {
        return res.status(400).send('no file uploaded')
    }
}


const createListing = async (req, res) => {
    console.log(req.file)
    try {
        // req.body.owner = req.session.user._id
        req.body.imgUrl = {
            url: req.file.path, // Cloudinary URL
            cloudinary_id: req.file.filename, // Cloudinary public ID
        }
        req.body.owner = req.params.userId
        await Listing.create(req.body)
        res.redirect('/listings')
    } catch (error) {
        console.log(error)

    }
}

module.exports = {createFiles}