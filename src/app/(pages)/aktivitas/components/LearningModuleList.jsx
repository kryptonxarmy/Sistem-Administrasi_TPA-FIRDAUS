// components/LearningModuleList.jsx
import React from 'react';
import { getCldImageUrl } from 'next-cloudinary';

const LearningModuleList = ({ learningModules }) => {
  return (
    <div>
      {learningModules.map((module) => (
        <div key={module.id} className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">{module.title}</h2>
          <p>{module.description}</p>
          {module.conceptMap && (
            <img
              src={getCldImageUrl({
                src: module.conceptMap,
                width: 300,
                height: 200,
              })}
              alt={module.title}
              className="mt-2 w-full h-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningModuleList;