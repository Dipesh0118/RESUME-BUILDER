import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    setIsLoading(true); // Start loading
    GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        // Ensure that resp.data.data is an array
        if (Array.isArray(resp.data.data)) {
          setResumeList(resp.data.data);
        } else {
          console.error("Expected an array, got: ", resp.data.data);
          setResumeList([]); // Reset to empty array if not an array
        }
      })
      .catch(error => {
        console.error("Error fetching resumes: ", error);
        setResumeList([]); // Handle error by resetting the list
      })
      .finally(() => {
        setIsLoading(false); // End loading
      });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating Resume with AI for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {isLoading ? (
          <div>Loading...</div> // Show loading indicator
        ) : resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse' key={index}></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
