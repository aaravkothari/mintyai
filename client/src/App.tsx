import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Sidebar } from "./Sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Instructions from "./pages/Instructions/Instructions";
import Reports from "./pages/Reports/Reports";
import Chatbot from "./pages/ChatBot/Chatbot";
import StudentMastery from "./pages/StudentMastery/StudentMastery";
import { LoginForm } from "./pages/Login/LoginForm";
import LoginPage from "./pages/Login/Login";

function AppContent() {
  const [selected, setSelected] = useState("Dashboard");
  const location = useLocation();

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      {location.pathname !== "/home" && (
        <Sidebar selected={selected} setSelected={setSelected} />
      )}
      <div>
      
        <Routes>
          
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions/*" element={<Transactions />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/studentmastery/*" element={<StudentMastery />} />
          <Route path="/mintyai" element={<Chatbot />} />
        </Routes>
      </div>
    </main>
  );
}

/* 

*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<LoginPage />} />
      </Routes> 
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
