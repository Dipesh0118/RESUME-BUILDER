require("dotenv").config(); // Load environment variables first
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserResume = require("./models/schema.js"); // Update with the correct schema path
const app = express();
const userResumesRoutes = require('./routes/userResumes'); // Adjust path as needed
app.use(cors({
origin: "http://localhost:5173", // Frontend origin
methods: ["GET", "POST", "PUT", "DELETE"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: true
}));
// Other middleware and route definitions
app.use(express.json());
app.use('/api', userResumesRoutes);
console.log("DB_URL:", process.env.DB_URL); // Debugging line to check DB_URL
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose
.connect(process.env.DB_URL)
.then(() => {
console.log("DB connected");
})
.catch((error) => {
console.error("DB connection error:", error);
});
// Route to create a new user resume document in the database
app.post("/api", async (req, res) => {
try {
const data = await UserResume.create(req.body);
res.status(201).send({ success: true, resumeData: data });
} catch (error) {
console.error("Error saving data:", error);
res.status(500).send({ success: false, message: "Failed to save data" });
}
});
app.get("/",async(req,res)=>{
console.log("Welcome to the data");
res.send("Helllo");
})
// Route to fetch a user resume by ID
app.get("/api/:id", async (req, res) => {
try {
const data = await UserResume.findById(req.params.id);
if (!data) {
return res.status(404).send({ success: false, message: "Resume not found" });
}
res.send({ success: true, resumeData: data });
} catch (error) {
console.error("Error fetching data:", error);
res.status(500).send({ success: false, message: "Failed to retrieve data" });
}
});
// Start the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
console.log(`Server is listening at port ${PORT} in ${process.env.NODE_ENV || "development"} environment`);
});
