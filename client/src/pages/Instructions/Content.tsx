import React from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
  return (
    <div className="grid grid-cols-12 p-4 shadow-md">
      <div className="col-span-4 p-4 rounded-md border border-stone-300 mr-4 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Table of Contents</h2>
        <ul className="pl-5 list-disc space-y-2">
          <li>
            <a href="#how-the-tracker-works" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">How the Tracker Works</a>
          </li>
          <li>
            <a href="#page-overview" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Page Overview</a>
            <ul className="pl-5 list-disc ml-4 space-y-2">
              <li>
                <a href="#instructions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Instructions</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#instructions-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#instructions-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a></li>
                  <li><a href="#instructions-faqs" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">FAQs</a></li>
                </ul>
              </li>
              <li>
                <a href="#dashboard" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Dashboard</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#dashboard-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#dashboard-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a></li>
                </ul>
              </li>
              <li>
                <a href="#transactions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Transactions</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#transactions-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#transactions-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a>
                    <ul className="pl-5 list-disc ml-4 space-y-2">
                      <li><a href="#adding-transactions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Adding Transactions</a></li>
                      <li><a href="#editing-transactions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Editing Transactions</a></li>
                      <li><a href="#deleting-transactions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Deleting Transactions</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#reports" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Reports</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#reports-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#reports-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a>
                    <ul className="pl-5 list-disc ml-4 space-y-2">
                      <li><a href="#timeframe-selection" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Timeframe Selection</a></li>
                      <li><a href="#charts-and-graphs" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Charts and Graphs</a></li>
                      <li><a href="#statistics" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Statistics</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#student-mastery" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Student Mastery</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#student-mastery-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#student-mastery-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a>
                    <ul className="pl-5 list-disc ml-4 space-y-2">
                      <li><a href="#budget-setting" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Budget Setting</a></li>
                      <li><a href="#income-goal-setting" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Income Goal Setting</a></li>
                      <li><a href="#learning-resources" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Learning Resources</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#mintyai-chatbot" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">MintyAI Chatbot</a>
                <ul className="pl-5 list-disc ml-4 space-y-2">
                  <li><a href="#mintyai-purpose" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Purpose</a></li>
                  <li><a href="#mintyai-features" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Features</a>
                    <ul className="pl-5 list-disc ml-4 space-y-2">
                      <li><a href="#general-financial-learning" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">General Financial Learning</a></li>
                      <li><a href="#tracker-guidance" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Tracker Guidance</a></li>
                      <li><a href="#transaction-insights" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Transaction Insights</a></li>
                      <li><a href="#example-questions" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Example Questions</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#getting-started" className="text-gray-600 hover:text-emerald-500 hover:font-bold transition-all duration-600">Getting Started</a>
          </li>
        </ul>
      </div>
      <div className="col-span-8 p-6 rounded-md border border-stone-300 overflow-y-auto max-h-screen">
        <section id="how-the-tracker-works" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions for Personal Finance Tracker</h2>
          <p className="text-gray-600">Welcome to the Personal Finance Tracker! This guide will help you navigate the tracker’s features, understand how to use each page, and make the most of its functionality. Whether you’re new to budgeting or a seasoned financial planner, this tracker will help you stay organized and achieve your financial goals.</p>
        </section>
        <section id="how-the-tracker-works" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How the Tracker Works</h2>
          <p className="text-gray-600">The Personal Finance Tracker is designed to simplify financial management by providing an intuitive platform to monitor, analyze, and improve your financial habits. Here are the key functionalities:</p>
          <ul className="pl-5 list-disc space-y-2">
            <li><strong>Track Income and Expenses</strong>: Record all financial transactions and categorize them as income or expenses.</li>
            <li><strong>Visualize Financial Trends</strong>: Use graphs and charts to identify patterns in your financial habits.</li>
            <li><strong>Set Goals</strong>: Establish budgets and income targets to stay on track.</li>
            <li><strong>Learn Financial Literacy</strong>: Access resources and courses to improve your financial knowledge.</li>
            <li><strong>Get Assistance</strong>: Use the MintyAI chatbot for instant help and advice.</li>
          </ul>
        </section>
        <section id="page-overview" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Overview</h2>
          <section id="instructions" className="mb-8">
          <Link to="/instructions"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">Instructions</h3></Link>
            <section id="instructions-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">To provide a comprehensive guide on how to use the tracker.</p>
            </section>
            <section id="instructions-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>Getting Started</strong>: Learn how to set up your tracker.</li>
                <li><strong>Page Descriptions</strong>: Understand the functionality of each page.</li>
                <li><strong>FAQs</strong>: Common questions and solutions for troubleshooting.</li>
              </ul>
            </section>
            <section id="instructions-faqs" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">FAQs</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>How do I add a transaction?</strong> Go to the <strong>Transactions</strong> page, click the add button, and fill in the required fields.</li>
                <li><strong>How do I set a budget?</strong> Navigate to the <strong>Student Mastery</strong> page and edit the budget card.</li>
                <li><strong>What is the purpose of the MintyAI chatbot?</strong> MintyAI can assist with financial queries and usage tips.</li>
              </ul>
            </section>
          </section>
          <section id="dashboard" className="mb-8">
          <Link to="/dashboard"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">Dashboard</h3></Link>
            <section id="dashboard-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">Provides a summary of your current financial standing.</p>
            </section>
            <section id="dashboard-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>Net Balance</strong>: Displays income minus expenses.</li>
                <li><strong>Total Income and Expenses</strong>: Shows cumulative amounts.</li>
                <li><strong>Budget Progress Bar</strong>: Tracks monthly spending against your budget.</li>
                <li><strong>Income Goal Progress Bar</strong>: Tracks progress toward your income goal.</li>
                <li><strong>Line Graph</strong>: Visualizes income and expenses over the past 6 months.</li>
                <li><strong>Expense Radar Chart</strong>: Categorizes spending into predefined segments.</li>
                <li><strong>Recent Transactions</strong>: Displays the latest six transactions by date.</li>
              </ul>
            </section>
          </section>
          <section id="transactions" className="mb-8">
          <Link to="/transactions"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">Transactions</h3></Link>
            <section id="transactions-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">Allows you to log, edit, and delete financial transactions.</p>
            </section>
            <section id="transactions-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>Transaction Table</strong>: Displays all transactions with columns:
                  <ul className="pl-5 list-disc space-y-2">
                    <li>Date</li>
                    <li>Type (income/expense)</li>
                    <li>Category</li>
                    <li>Amount</li>
                    <li>Description (optional)</li>
                    <li>Action (Edit/Delete buttons)</li>
                  </ul>
                </li>
                <li><strong>Adding Transactions</strong>:
                  <ol className="pl-5 list-decimal space-y-2">
                    <li>Click the add button (card icon) in the top-right corner.</li>
                    <li>Fill in the required fields:
                      <ul className="pl-5 list-disc space-y-2">
                        <li>Date</li>
                        <li>Type (income/expense)</li>
                        <li>Category</li>
                        <li>Amount</li>
                        <li>Description (optional)</li>
                      </ul>
                    </li>
                    <li>Click "Save" to add the transaction.</li>
                  </ol>
                </li>
                <li><strong>Editing Transactions</strong>:
                  <ol className="pl-5 list-decimal space-y-2">
                    <li>Click the Edit button (three dots) in the transaction row.</li>
                    <li>Update the desired fields.</li>
                    <li>Click "Save" to confirm changes.</li>
                    <li>Optionally, delete the transaction while editing.</li>
                  </ol>
                </li>
                <li><strong>Deleting Transactions</strong>: Click the Delete button (trash can) in the transaction row to permanently remove it.</li>
              </ul>
            </section>
          </section>
          <section id="reports" className="mb-8">
          <Link to="/reports"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">Reports</h3></Link>
            <section id="reports-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">Analyze your financial data through charts, graphs, and statistics.</p>
            </section>
            <section id="reports-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>Timeframe Selection</strong>: Use the dropdown menu to filter reports by:
                  <ul className="pl-5 list-disc space-y-2">
                    <li>Last 1 week</li>
                    <li>Last 1 month</li>
                    <li>Last 3 months</li>
                    <li>Last 6 months (default)</li>
                    <li>Last 1 year</li>
                    <li>Last 5 years</li>
                  </ul>
                </li>
                <li><strong>Charts and Graphs</strong>:
                  <ul className="pl-5 list-disc space-y-2">
                    <li>Activity Line Graph (Income and Expenses)</li>
                    <li>Expense Radar Chart (categorized spending)</li>
                    <li>Income Radar Chart (categorized income)</li>
                    <li>Expense Bar Chart (spending by category)</li>
                  </ul>
                </li>
                <li><strong>Statistics</strong>:
                  <ul className="pl-5 list-disc space-y-2">
                    <li>Net Income</li>
                    <li>Savings Rate</li>
                    <li>Expense-to-Income Ratio</li>
                    <li>Income-to-Expense Ratio</li>
                  </ul>
                </li>
              </ul>
            </section>
          </section>
          <section id="student-mastery" className="mb-8">
          <Link to="/studentmastery"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">Student Mastery</h3></Link>
            <section id="student-mastery-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">Improve financial literacy and set personal financial goals.</p>
            </section>
            <section id="student-mastery-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>Budget Setting</strong>:
                  <ol className="pl-5 list-decimal space-y-2">
                    <li>Click the three dots on the Monthly Budget card.</li>
                    <li>Enter your desired budget.</li>
                  </ol>
                </li>
                <li><strong>Income Goal Setting</strong>:
                  <ol className="pl-5 list-decimal space-y-2">
                    <li>Click the "Set Goal" button on the Income Goal card.</li>
                    <li>Specify the start date and income target.</li>
                  </ol>
                </li>
                <li><strong>Learning Resources</strong>:
                  <ul className="pl-5 list-disc space-y-2">
                    <li>Access linked courses on Khan Academy:
                      <ul className="pl-5 list-disc space-y-2">
                        <li>Financial Goals Course</li>
                        <li>Budgeting and Saving Course</li>
                        <li>Saving and Investing Course</li>
                      </ul>
                    </li>
                    <li>Explore additional resources:
                      <ul className="pl-5 list-disc space-y-2">
                        <li>Yahoo Finance</li>
                        <li>Investopedia</li>
                        <li>Nerd Wallet</li>
                        <li>Next Gen Personal Finance</li>
                        <li>Practical Money Skills by VISA</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </section>
          <section id="mintyai-chatbot" className="mb-8">
            <Link to="/mintyai"><h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-emerald-500 transition-all duration-500">MintyAI Chatbot</h3></Link>
            <section id="mintyai-purpose" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Purpose</h4>
              <p className="text-gray-600">Provides instant assistance for learning personal finance or using the tracker.</p>
            </section>
            <section id="mintyai-features" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Features</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li><strong>General Financial Learning</strong>: Ask MintyAI questions about budgeting, saving, or investing.</li>
                <li><strong>Tracker Guidance</strong>: Get help navigating the tracker’s features.</li>
                <li><strong>Transaction Insights</strong>: Query specific transactions or patterns in your financial data.</li>
              </ul>
            </section>
            <section id="example-questions" className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Example Questions</h4>
              <ul className="pl-5 list-disc space-y-2">
                <li>“How much did I spend on groceries last month?”</li>
                <li>“What is the best way to save for an emergency fund?”</li>
                <li>“How do I edit a transaction?”</li>
              </ul>
            </section>
          </section>
        </section>
        <section id="getting-started" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
          <ol className="pl-5 list-decimal space-y-2">
            <li>Familiarize yourself with the <strong>Instructions</strong> page.</li>
            <li>Begin adding your income and expenses on the <strong>Transactions</strong> page.</li>
            <li>Review your financial summary on the <strong>Dashboard</strong>.</li>
            <li>Analyze trends and statistics on the <strong>Reports</strong> page.</li>
            <li>Set goals and explore resources on the <strong>Student Mastery</strong> page.</li>
            <li>Use <strong>MintyAI</strong> for any questions or assistance.</li>
          </ol>
          <p className="text-gray-600">By following these steps, you’ll be well on your way to achieving financial mastery!</p>
        </section>
      </div>
    </div>
  );
};

export default Content;