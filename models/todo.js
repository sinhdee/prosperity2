const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String,required:true},
    completed:{type: String, Boolean, default:false}
});