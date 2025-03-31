import React from 'react';

function SummeryPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            
            <p className='text-xs my-4'>
                {resumeInfo?.summery ? resumeInfo.summery : " "}
            </p>
        </div>
    );
}

export default SummeryPreview;
