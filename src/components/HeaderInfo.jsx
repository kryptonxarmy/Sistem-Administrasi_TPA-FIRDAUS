import React from "react";

export default function HeaderInfo({items}) {
  

  return (
    <div className="flex justify-around">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
            <item.icon className="text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">{item.title}</p>
            <p className="font-bold text-lg">{item.desc}</p>
          </div>
        </div>  
      ))}
    </div>
  );
}
