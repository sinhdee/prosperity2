const mongoose = require('mongoose')

const filesSchema = new mongoose.Schema({
   image: {
        url: { type: String, required: true }, 
        cloudinary_id: { type: String, required: true }, 
      }
});

const Files = mongoose.model('Files', filesSchema)

module.exports= Files