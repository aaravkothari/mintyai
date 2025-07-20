import React, { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

import { HiOutlineHome } from "react-icons/hi";
import { IoReaderOutline } from "react-icons/io5";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { SiSololearn } from "react-icons/si";

interface NavProps {
  Icon: IconType;
  selected: boolean;
  title: string;
  size: string;
}

export const RouteSelect = ({ value, setValue }: {value:string, setValue:Function}) => {


  const [selected, setSelected] = useState(value);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("instructions")) {
      setSelected("Instructions");
    } else if (location.pathname.includes("dashboard") || location.pathname === "/") {
      setSelected("Dashboard");
    } else if (location.pathname.includes("transaction")) {
      setSelected("Transactions");
    } else if (location.pathname.includes("reports")) {
      setSelected("Reports");
    } else if (location.pathname.includes("studentmastery")) {
      setSelected("StudentMastery");
    } else {
      setSelected("None");
    }
  }, [location]);

  return (
    <div className="space-y-1">
      <Link to="/instructions" onClick={() => setSelected("Instructions")}>
        <Nav size="16" Icon={IoReaderOutline} selected={true ? selected == "Instructions" : false} title="Instructions" />
      </Link>
      <Link to="/dashboard" onClick={() => setSelected("Dashboard")}>
        <Nav size="16" Icon={HiOutlineHome} selected={true ? selected == "Dashboard" : false} title="Dashboard" />
      </Link>
      <Link to="/transactions" onClick={() => setSelected("Transactions")}>
        <Nav size="16" Icon={HiOutlineCreditCard} selected={true ? selected == "Transactions" : false} title="Transactions" />
      </Link>
      <Link to="/reports" onClick={() => setSelected("Reports")}>
        <Nav size="16" Icon={TbReportSearch} selected={true ? selected == "Reports" : false} title="Reports" />
      </Link>
      <Link to="/studentmastery" onClick={() => setSelected("StudentMastery")}>
        <Nav size="14" Icon={SiSololearn} selected={true ? selected == "StudentMastery" : false} title="Student Mastery" />
      </Link>
    </div>
  );
};

const Nav = ({ Icon, selected, title, size }: NavProps) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon size={size} className={selected ? "text-[#39C68A]" : ""} />
      <span>{title}</span>
    </button>
  );
};