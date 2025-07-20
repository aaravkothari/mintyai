import React from "react";
import { StudentMasteryTopBar } from "./TopBar";
import Learn from "./Learn";
import { Route, Routes } from "react-router-dom";
import Budget from "./Budget";
import Income from "./Income";

const StudentMastery = () => {
  return (
    <div className="shadow-lg rounded-md">
      <StudentMasteryTopBar />
      <Routes>
        <Route path="/" element={<Learn />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/incomegoal" element={<Income />} />
      </Routes>
    </div>
  );
};

export default StudentMastery;
