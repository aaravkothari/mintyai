import React from "react";
import { MdAddCard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const ChatBotTopBar = () => {
  return (
    <div className="border-b px-4 mt-2 pb-2 pt-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-md font-bold block">Welcome Aarav!</span>
          <span className="text-xs block text-stone-500">
            Chat with MintyAI
          </span>
        </div>
      </div>
    </div>
  );
};