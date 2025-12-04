import React from "react";
import { Link } from "react-router-dom";

const InfoItem = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">

      {/* ICON DISPLAY */}
      <div className="flex justify-center mb-4">
        <div className="text-yellow-500 w-10 h-10 flex items-center justify-center">
          {item.icon}
        </div>
      </div>

      {/* HEADING */}
      <Link to={item.link}> <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500 text-center mb-2">
        {item.heading}
      </h3></Link>

      {/* PARAGRAPH */}
      <p className="text-gray-600 text-center">
        {item.para}
      </p>

    </div>
  );
};

export default InfoItem;
