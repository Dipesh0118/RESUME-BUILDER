import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

const initialEducationField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
};

function Education() {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList] = useState([initialEducationField]);

    useEffect(() => {
        if (resumeInfo?.education) {
            setEducationalList(resumeInfo.education);
        }
    }, [resumeInfo]);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setEducationalList((prevList) =>
            prevList.map((item, idx) => (idx === index ? { ...item, [name]: value } : item))
        );
    };

    const addNewEducation = (event) => {
        event.preventDefault(); // Prevent default form behavior
        setEducationalList((prevList) => [...prevList, initialEducationField]);
    };

    const removeEducation = (event) => {
        event.preventDefault(); // Prevent default form behavior
        if (educationalList.length > 1) {
            setEducationalList((prevList) => prevList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            education: educationalList.map(({ id, ...rest }) => rest)
        };
    
        GlobalApi.UpdateResumeDetail(params.resumeId, data)
            .then((resp) => {
                console.log(resp);
                setResumeInfo((prevInfo) => ({
                    ...prevInfo,
                    education: educationalList,
                }));
                setLoading(false);
                toast('Details updated!');
            })
            .catch((error) => {
                setLoading(false);
                toast('Server Error, Please try again!');
            });
    };
    

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input
                                    name="universityName"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.universityName}
                                />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input
                                    name="degree"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.degree}
                                />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input
                                    name="major"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.major}
                                />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.startDate}
                                />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.endDate}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea
                                    name="description"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.description}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={addNewEducation} className="text-primary">
                        + Add More Education
                    </Button>
                    <Button variant="outline" onClick={removeEducation} className="text-primary">
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Education;
