import React from "react";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-2 pt-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-md font-bold block">Welcome Aarav!</span>
          <span className="text-xs block text-stone-500">
            Dashboard
          </span>
        </div>

        <Link to="/reports" className="flex text-sm items-center gap-1.5 bg-stone-100 transition-colors hover:bg-[#c9efdf] px-3 py-1.5 rounded">
          <TbReportSearch size="18"/>
          <span>View Reports</span>
        </Link>
      </div>
    </div>
  );
};