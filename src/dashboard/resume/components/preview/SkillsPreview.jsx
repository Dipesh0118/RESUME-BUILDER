import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor || 'black' }} // Default color black if themeColor is not provided
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor || 'black' }} />

      <div className="my-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center mb-4"> {/* Use flex to align horizontally */}
            <h2 className="text-xs mr-4">{skill.name}</h2> {/* Added margin to the right to space out text and rating */}
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor || 'black', // Default color black if themeColor is not provided
                  width: skill?.rating * 20 + '%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
