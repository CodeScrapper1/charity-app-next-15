import { iconsData } from "@/lib/data";
import React from "react";

const CharityIcons = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-fuchsia-600 w-1/2 m-auto py-16">
        Welcome to kind Heart community
      </h1>
      <div className="w-4/5 m-auto grid md:grid-cols-4 grid-cols-1 py-6 gap-8">
        {iconsData?.map((item, index: number) => (
          <div
            className="group text-fuchsia-600 text-xl p-2 duration-300 border-2 flex flex-col items-center rounded-2xl gap-2 hover:shadow-xl shadow-gray-800 hover:bg-white cursor-pointer hover:scale-105"
            key={index}
          >
            <img
              src={item.image}
              className="scale-105 group-hover:scale-90 duration-300"
              alt=""
            />
            <span className="text-2xl">Become a</span>
            <strong>Volunteer</strong>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharityIcons;
