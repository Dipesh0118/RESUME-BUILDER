import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize form data with existing resumeInfo
        setFormData(resumeInfo || {});
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        enabledNext(false);
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value,
        }));
    };
    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, formData); // Send formData directly
            console.log("Save response:", response);
            enabledNext(true);
            toast("Details updated");
        } catch (error) {
            console.error("Failed to save data:", error);
            toast("Failed to save data. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={formData.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" required onChange={handleInputChange} defaultValue={formData.lastName} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" required defaultValue={formData.jobTitle} onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" required defaultValue={formData.address} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" required defaultValue={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" required defaultValue={formData.email} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
