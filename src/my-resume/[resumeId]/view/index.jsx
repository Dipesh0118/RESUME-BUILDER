import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import PersonalDetailPreview from '@/dashboard/resume/components/preview/PersonalDetailPreview'; // Import the component
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';
import LastPreview from '@/dashboard/resume/components/LastPreview';

function ViewResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumeInfo = async () => {
            try {
                setLoading(true);

                // Fetch resume data
                const response = await GlobalApi.GetResumeById(resumeId);
                console.log("API Response fetch:", response);

                // Verify and set fetched data
                if (response) {
                    setResumeInfo(response);
                    console.log("Updated resumeInfo:", response); // Log response to ensure correct data structure
                } else {
                    console.warn("Fetched data is empty or undefined.");
                }

            } catch (error) {
                console.error("Failed to load resume data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResumeInfo();
    }, [resumeId]);

    const handleDownload = () => window.print();

    if (loading) return <p>Loading resume...</p>;
    if (!resumeInfo) return <p>Error: Resume data not available.</p>;

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-5'>
                <div 
  style={{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    fontFamily: "'Roboto', sans-serif", 
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '80%',
    margin: '0 auto',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
  }}
>
  Your Resume Generated With AI is Ready. You can download and share it.
</div>

                    <div className='flex items-center justify-center'>
                        <Button onClick={handleDownload}>Download</Button>
                    </div>
                </div>
            </div>

            {/* Render PersonalDetailPreview */}
            {/* <PersonalDetailPreview resumeInfo={resumeInfo.resume} /> */}
            <LastPreview resumeData={resumeInfo.resume} />
            {/* <ResumePreview resumeData={resumeInfo.resume} />
             */}
            <div id="no-print" className="text-center py-4 bg-slate-50 border-t fixed w-full left-0 bottom-0 z-50">
                <RWebShare
                    data={{
                        title: "Resume",
                        text: "Check out my resume",
                        url: window.location.href,
                    }}
                >
                    <Button>Share Link</Button>
                </RWebShare>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
