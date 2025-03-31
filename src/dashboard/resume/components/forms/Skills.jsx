import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }]);

    // Only initialize skills if they are available in resumeInfo
    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo.skills);
        }
    }, [resumeInfo?.skills]); // Dependency only on resumeInfo.skills

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const addNewSkills = () => setSkillsList([...skillsList, { name: '', rating: 0 }]);

    const removeSkills = () => {
        if (skillsList.length > 1) setSkillsList(skillsList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        const filteredSkillsList = skillsList.filter(skill => skill.name.trim() !== ''); 
        const data = { skills: filteredSkillsList.map(({ name, rating }) => ({ name, rating })) };

        try {
            const resp = await GlobalApi.UpdateResumeDetail(resumeId, data);
            setResumeInfo(prevInfo => ({ ...prevInfo, skills: filteredSkillsList }));
            toast('Details updated!');
        } catch (error) {
            toast('Server Error, Try again!');
        } finally {
            setLoading(false);
        }
    };

    // Ensure resumeInfo is updated correctly without unnecessary re-renders
    useEffect(() => {
        if (skillsList !== resumeInfo.skills) {
            setResumeInfo(prevInfo => ({ ...prevInfo, skills: skillsList }));
        }
    }, [skillsList, resumeInfo.skills, setResumeInfo]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>
            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div className='flex-1'>
                            <label className='text-xs'>Name</label>
                            <Input
                                className="w-full"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className='flex items-center ml-2'>
                            <label className='text-xs'>Rating</label>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={addNewSkills} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={removeSkills} className="text-primary"> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
