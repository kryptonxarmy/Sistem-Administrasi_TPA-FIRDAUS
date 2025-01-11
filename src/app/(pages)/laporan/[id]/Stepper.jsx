"use client";

import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              index === currentStep ? "bg-primary text-white" : "bg-white text-gray-500"
            }`}
          >
            {index === currentStep ? <Check className="text-white" /> : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
              <div
                className="absolute top-0 left-0 h-full bg-gray-300"
                style={{ width: "100%" }}
              ></div>
            </div>
          )}
          <p className="mt-2 text-center">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;