import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Title = () => {
  return (
    <div className="border-b mb-4 mt-5 pb-2 border-stone-300">
      <Link to="/" className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
      <PiStudentBold className="text-green-700" size="32" />
        <div className="text-start">
          <span className="text-sm font-bold block">Personal Finance Tracker</span>
          <span className="text-xs block text-stone-500">for students</span>
        </div>

        
      </Link>
    </div>
  );
};