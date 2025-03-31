const mongoose = require("mongoose");

const userResumeSchema = new mongoose.Schema({
  // Personal Details
  resumeId: {type: String},
  documentId: {type: String},

  firstName: { type: String },
  lastName: { type: String },
  jobTitle: { type: String },
  address: { type: String },
  phone: { type: String },
  userEmail: { type: String, required: true },
  

  // Summary
  summery: { type: String },

  // Professional Experience
  Experience: [
      {
          positionTitle: { type: String, required: true },
          companyName: { type: String, required: true },
          city: { type: String },
          state: { type: String },
          startDate: { type: String, required: true },
          endDate: { type: String },
          workSummery: { type: String }
      }
  ],
  themeColor:{type: String},

  // Education
  education: [
      {
          university: { type: String, required: true },
          degree: { type: String },
          major: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          description: { type: String }
      }
  ],

  // Skills
  skills: [
      {
          name: { type: String, required: true },
          rating: { type: Number, min: 1, max: 5 }
      }
  ]
});

const UserResume = mongoose.model("UserResume", userResumeSchema);

module.exports = UserResume;  // Ensure this line is present and correct
