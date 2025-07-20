import React, { useState } from "react";
import { LuMessageSquareShare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { RouteSelect } from "./RouteSelect";


export const HelpSection = ({ setValue }: { setValue:Function }) => {
  
  

  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">MintyAI</p>
          <p className="text-stone-500">Your Personal Assistant</p>
        </div>


        <Link to="/mintyai" onClick={() => {setValue("None")}} className="px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded">
          <LuMessageSquareShare size="20" />
        </Link>
      </div>
    </div>
  );
};