// Import required modules
const express = require('express');
const UserResume = require("../models/schema"); // Adjust this path as needed
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Helper function for error handling
const handleError = (res, error) => {
    console.error("Error:", error); // Log error for debugging
    res.status(400).json({ error: error.message });
};

// Create a new resume
router.post("/user-resumes", async (req, res) => {
    console.log("Incoming data:", req.body); // Log incoming data for debugging
    try {
        const newResume = await UserResume.create(req.body);
        res.status(201).json({
            documentId: newResume._id,
            title: newResume.title, // Include other fields if necessary
        });
    } catch (error) {
        handleError(res, error);
    }
});

// Get resumes by user email
router.get('/user-resumes', async (req, res) => {
    const { userEmail } = req.query;
    if (!userEmail) return res.status(400).json({ error: "User email is required" });
    
    try {
        const resumes = await UserResume.find({ email: userEmail });
        res.json({ resumes });
    } catch (error) {
        handleError(res, error);
    }
});

// // Update resume by ID
// router.put('/user-resumes/:id', async (req, res) => {
//     try {
//         const updatedResume = await UserResume.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedResume) return res.status(404).json({ error: "Resume not found" });
//         res.json({ updatedResume });
//     } catch (error) {
//         handleError(res, error);
//     }
// });
 router.put(
    '/user-resumes/:id',
    [
        body('education').isArray().optional(),
        body('professionalExperience').isArray().optional(),
        body('skills').isArray().optional(),
        body('userEmail').isEmail().optional(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedResume = await UserResume.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedResume) return res.status(404).json({ error: "Resume not found" });
            res.json({ updatedResume });
        } catch (error) {
            console.error('Error updating resume:', error);
            res.status(500).json({ error: "Server error, please try again later." });
        }
    });

// Get resume by ID
router.get('/user-resumes/:id', async (req, res) => {
    try {
        const resume = await UserResume.findById(req.params.id);
        if (!resume) return res.status(404).json({ error: "Resume not found" });
        res.json({ resume });
    } catch (error) {
        handleError(res, error);
    }
});

// Delete resume by ID
router.delete('/user-resumes/:id', async (req, res) => {
    try {
        const deletedResume = await UserResume.findByIdAndDelete(req.params.id);
        if (!deletedResume) return res.status(404).json({ error: "Resume not found" });
        res.status(204).end();
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
