// dummy.jsx
const requestData = {
    firstName: "John",           // Required
    lastName: "Doe",             // Required
    jobTitle: "Software Engineer", // Required
    address: "123 Main St, Springfield", // Optional
    phone: "555-1234",           // Optional
    email: "johndoe@example.com", // Required

    // Summary section
    summary: "Experienced software engineer with expertise in web development.",

    // Professional Experience (Array) - At least one entry with required fields
    professionalExperience: [
      {
        positionTitle: "Senior Developer", // Required
        companyName: "Tech Corp",         // Required
        city: "Springfield",
        state: "IL",
        startDate: "2021-01-01",           // Required
        endDate: "2023-01-01",
        summary: "Developed web applications and led a team of engineers."
      }
    ],

    // Education (Array) - At least one entry with required fields
    education: [
      {
        university: "State University",    // Required
        degree: "B.Sc. in Computer Science",
        major: "Computer Science",
        startDate: "2015-01-01",
        endDate: "2019-01-01",
        description: "Graduated with honors."
      }
    ],

    // Skills (Array) - At least one entry with required fields
    skills: [
      {
        name: "JavaScript",               // Required
        rating: 5                         // Rating between 1 and 5
      }
    ]
};

// Export the requestData object as a default export
export default requestData;
