import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { TbReportSearch } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const TopBar = ({ setTimeFrame }: { setTimeFrame: Function }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFrame(event.target.value);
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-2 pt-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-md font-bold block">Welcome Aarav!</span>
          <span className="text-xs block text-stone-500">
            Reports
          </span>
        </div>
        <div className="border flex text-sm items-center gap-2 bg-stone-100 transition-colors px-3 py-1.5 rounded hover:border-black focus:border-black">
          <FiCalendar />
          <select className="bg-stone-100 transition-colors pr-2" onChange={handleChange}>
            
            <option value="week1">Last 1 Week</option>
            <option value="month1">Last 1 Month</option>
            <option value="month3">Last 3 Months</option>
            <option value="month6" selected>Last 6 Months</option>
            <option value="year1">Last 1 Year</option>
            <option value="year5">Last 5 Years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopBar;