import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../service/GlobalApi';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Track errors

    useEffect(() => {
        const fetchResume = async () => {
            setLoading(true);  // Start loading
            setError(null);  // Reset any previous error

            try {
                const response = await GlobalApi.GetResumeById(resumeId);
                if (response?.data?.data) {
                    setResumeInfo(response.data.data);
                } else {
                    setError('No resume data found.');
                }
            } catch (err) {
                console.error("Error fetching resume:", err);
                setError('Failed to load resume. Please try again.');
            } finally {
                setLoading(false);  // End loading
            }
        };

        if (resumeId) {
            fetchResume();
        } else {
            setError('No resume ID provided.');
            setLoading(false);  // End loading
        }
    }, [resumeId]);

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, loading, error }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};
