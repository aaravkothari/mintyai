import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GrResources } from 'react-icons/gr';
import { PiChartPieSlice } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import axios from 'axios';

interface Mastery {
  id: number;
  date: string;
  budget: number;
  income_goal: number;
  income_goal_date: string;
  budget_date: string;
}

const Learn = () => {

  const [mastery, setMastery] = useState<Mastery>();
 

  useEffect(() => {
    getMastery();
    console.log(mastery)
  }, []);

  function getMastery() {
    axios
      .get("http://127.0.0.1:8080/listmasteries")
      .then(function (response) {
        const sortedMasteries = response.data.sort((a: Mastery, b: Mastery) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMastery(sortedMasteries[0]);
      });

    
  }



  return (
    <div className="p-4">
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">


        <div className="bg-white p-4 border border-stone-400 h-32 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-stone-500 mb-2 text-sm">{mastery && mastery.budget !== 0 ? "Current Month's Budget" : "Click the Three Dots"}</h3>
            <Link to="/studentmastery/budget" className="hover:bg-stone-200 transition-all duration-300 rounded text-sm px-1"> 
              <FiMoreHorizontal  size="20" />
            </Link>
          </div>

          <p className="text-3xl font-semibold mb-5">{mastery && mastery.budget !== 0 ? mastery.budget.toFixed(2) : "Budget: None"}</p>
          <p className="text-xs text-stone-500">Resets every Month</p>

        </div>


        <div className="bg-white p-4 border border-stone-400 h-32 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-stone-500 mb-2 text-sm">{mastery && mastery.income_goal !== 0 ? "Income Goal" : "Click the Three Dots"}</h3>
            <Link to="/studentmastery/incomegoal" className="hover:bg-stone-200 transition-all duration-300 rounded text-sm px-1"> 
              <FiMoreHorizontal  size="20" />
            </Link>
          </div>

          <p className="text-3xl font-semibold mb-5">{mastery && mastery.income_goal !== 0 ? mastery.income_goal.toFixed(2) : "Income Goal: None"}</p>
          <div className="items-center flex justify-between">
            <p className="text-xs text-stone-500">Resets once Goal is Reached</p>
            <p className="text-xs text-stone-500">{mastery && `Start Date: ${mastery.income_goal_date}`}</p>
          </div>

        </div>

      </div>
      
      
      {/* Progress Bars */}
      <div className="">
    
        <Link to="https://www.khanacademy.org/economics-finance-domain/economics-personal-finance-va/x3ed8f3aede624754:financial-goals" target="_blank" rel="noopener noreferrer">
        <div className="border border-stone-400 p-3 rounded-md mb-4 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-medium mb-2">Financial Goals Course</h2>
            <h2 className="text-md font-medium mb-2">70%</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 m-1 relative">
            <div className="bg-emerald-600 h-3 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        </Link>

        <Link to="https://www.khanacademy.org/economics-finance-domain/economics-personal-finance-va/x3ed8f3aede624754:budgeting-saving" target="_blank" rel="noopener noreferrer">
        <div className="border border-stone-400 p-3 rounded-md mb-4 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-medium mb-2">Budgeting and Saving Course</h2>
            <h2 className="text-md font-medium mb-2">20%</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 m-1 relative">
            <div className="bg-emerald-400 h-3 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
        </Link>

        <Link to="https://www.khanacademy.org/economics-finance-domain/economics-personal-finance-va/x3ed8f3aede624754:saving-investing" target="_blank" rel="noopener noreferrer">
        <div className="border border-stone-400 p-3 rounded-md mb-4 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-medium mb-2">Saving and Investing Course</h2>
            <h2 className="text-md font-medium mb-2">40%</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 m-1 relative">
            <div className="bg-emerald-300 h-3 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        </Link>

      </div>

      {/* External Links */}
      <div className="border border-stone-400 rounded-md p-4">
        <h3 className="flex items-center gap-1.5 font-medium mb-3"><GrResources size="20" />Financial Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Link to="https://finance.yahoo.com" target="_blank" rel="noopener noreferrer" className="bg-stone-100 p-6 rounded-lg transtion-all duration-300 hover:shadow-md text-center border border-stone-400">
            <img src="yahoo.png" alt="Yahoo Finance" className="mx-auto mb-4 h-24" />
            <span className="font-medium">Yahoo Finance</span>
          </Link>

          <Link to="https://www.investopedia.com/" target="_blank" rel="noopener noreferrer" className="bg-stone-100 p-6 rounded-lg transtion-all duration-300 hover:shadow-md text-center border border-stone-400">
            <img src="investopedia.png" alt="Investopedia" className="mx-auto mb-4 h-24" />
            <span className="font-medium">Investopedia</span>
          </Link>

          <Link to="https://www.nerdwallet.com/" target="_blank" rel="noopener noreferrer" className="bg-stone-100 p-6 rounded-lg transtion-all duration-300 hover:shadow-md text-center border border-stone-400">
            <img src="nerdwallet.png" alt="Nerd Wallet" className="mx-auto mb-4 h-24" />
            <span className="font-medium">Nerd Wallet</span>
          </Link>

          <Link to="https://www.ngpf.org/" target="_blank" rel="noopener noreferrer" className="bg-stone-100 p-6 rounded-lg transtion-all duration-300 hover:shadow-md text-center border border-stone-400">
            <img src="nextgen.png" alt="Next Gen Personal Finance" className="mx-auto mb-4 h-24" />
            <span className="font-medium">Next Gen Personal Finance</span>
          </Link>

          <Link to="https://www.practicalmoneyskills.com/en" target="_blank" rel="noopener noreferrer" className="bg-stone-100 p-6 rounded-lg transtion-all duration-300 hover:shadow-md text-center border border-stone-400">
            <img src="visa.jpg" alt="Practical Money Skills by VISA" className="mx-auto mb-4 h-24" />
            <span className="font-medium">Practical Money Skills by VISA</span>
          </Link>
        

        </div>
      </div>
    </div>
  );
};

export default Learn;
