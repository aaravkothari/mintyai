import React, { useState } from 'react';
import TopBar from './TopBar';
import Grid from './Grid';

function Reports() {
  const [timeframe, setTimeframe] = useState("Last 6 Months");

  return (
    <div className="bg-white rounded-lg pb-4 shadow-lg min-w-[800px]">
      <TopBar setTimeFrame={setTimeframe} />
      <Grid timeframe={timeframe} />
    </div>
  );
}

export default Reports;