import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
    headers: {
        'Content-Type': 'application/json',
    }
});

// Create a new resume
const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

// Get all resumes for a specific user by their email
const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes', {
    params: { userEmail }
});

// Alternative Update resume details by ID using async/await
const UpdateResumeDetail = async (id, data) => {
    console.log('Sending data to update resume:', data); // Log data being sent

    try {
        const response = await axiosClient.put(`/user-resumes/${id}`, data);
        
        if (response && response.data) {
            console.log('API Response Data:', response.data); // Log response data
            return response.data;
        } else {
            console.error('Unexpected response format:', response);
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error in API call:', error); // Log any error
        throw error;
    }
};

// Get a specific resume by ID
const GetResumeById = async (id) => {
    try {
        const response = await axiosClient.get(`/user-resumes/${id}`);
        if (response && response.data) {
            console.log('Resume data retrieved successfully:', response.data);
            return response.data;
        } else {
            console.error('Unexpected response format:', response);
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error retrieving resume by ID:', error);
        throw error;
    }
};

// Delete a specific resume by ID
const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
