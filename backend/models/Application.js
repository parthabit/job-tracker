const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'],
      default: 'Full-time',
    },
    salary: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    interviewDate: {
      type: Date,
    },
    jobLink: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ user: 1, status: 1 });
ApplicationSchema.index({ user: 1, company: 'text', jobTitle: 'text' });

module.exports = mongoose.model('Application', ApplicationSchema);
