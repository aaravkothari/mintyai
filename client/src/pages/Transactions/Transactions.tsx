import React from "react";
import { Routes, Route } from "react-router-dom";
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import { TransactionTopBar } from "./TopBar";

function Transactions() {
  return (
    <div className="shadow-lg rounded-md">
      <TransactionTopBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="addnewtransaction" element={<Create />} />
        <Route path="transaction/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default Transactions;
