const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    postingLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
    },
  });

  module.exports = mongoose.model('application', applicationSchema);

