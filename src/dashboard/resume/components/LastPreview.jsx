import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'


function LastPreview() {


   const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)


 return (
   <div className='shadow-lg h-full p-14 border-t-[20px]'
   style={{
       borderColor:'#000',
       color: resumeInfo.resume.themeColor
   }}>
       {/* Personal Detail  */}
           <PersonalDetailPreview resumeInfo={resumeInfo.resume} />
       {/* Summery  */}
           <SummeryPreview resumeInfo={resumeInfo.resume} />
       {/* Professional Experience  */}
          {resumeInfo.resume.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo.resume} />}
       {/* Educational  */}
       {resumeInfo.resume.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo.resume} />}
       {/* Skilss  */}
       {resumeInfo.resume.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo.resume}/>}
   </div>
 )
}


export default LastPreview


