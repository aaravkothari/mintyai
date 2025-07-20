import React from "react";
import { MdAddCard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const TransactionTopBar = () => {
  const location = useLocation();

  return (
    <div className="border-b px-4 mt-2 pb-2 pt-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-md font-bold block">Welcome Aarav!</span>
          <span className="text-xs block text-stone-500">
            Transactions
          </span>
        </div>

        {location.pathname === "/transactions" && (
          <Link to="/transactions/addnewtransaction" className="bg-emerald-500 transition-colors hover:bg-emerald-600 px-3 py-1.5 rounded  text-white">
            <MdAddCard size="20" />
          </Link>
        )}
      </div>
    </div>
  );
};