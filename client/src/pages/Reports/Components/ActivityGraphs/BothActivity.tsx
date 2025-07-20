import React, { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { format, subDays, subMonths, subYears } from "date-fns";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

const getTimeframeDates = (timeframe: string) => {
  const now = new Date();
  let startDate: Date;
  let interval: string;

  switch (timeframe) {
    case "week1":
      startDate = subDays(now, 7);
      interval = "day";
      break;
    case "month1":
      startDate = subMonths(now, 1);
      interval = "day";
      break;
    case "month3":
      startDate = subMonths(now, 3);
      interval = "month";
      break;
    case "month6":
      startDate = subMonths(now, 6);
      interval = "month";
      break;
    case "year1":
      startDate = subYears(now, 1);
      interval = "month";
      break;
    case "year5":
      startDate = subYears(now, 5);
      interval = "year";
      break;
    default:
      startDate = subMonths(now, 6);
      interval = "month";
  }

  return { startDate, interval };
};

const aggregateData = (transactions: Transaction[], startDate: Date, interval: string) => {
  const data: { name: string; Expenses: number; Incomes: number }[] = [];
  const now = new Date();

  let currentDate = startDate;
  while (currentDate <= now) {
    const formattedDate = format(currentDate, interval === "day" ? "MM-dd" : interval === "month" ? "MMM" : "yyyy");
    data.push({ name: formattedDate, Expenses: 0, Incomes: 0 });

    if (interval === "day") {
      currentDate = subDays(currentDate, -1);
    } else if (interval === "month") {
      currentDate = subMonths(currentDate, -1);
    } else {
      currentDate = subYears(currentDate, -1);
    }
  }

  transactions.forEach(transaction => {
    const transactionDate = format(new Date(transaction.date), interval === "day" ? "MM-dd" : interval === "month" ? "MMM" : "yyyy");
    const dataEntry = data.find(d => d.name === transactionDate);
    if (dataEntry) {
      if (transaction.type === "Expense") {
        dataEntry.Expenses += Math.abs(transaction.amount);
      } else if (transaction.type === "Income") {
        dataEntry.Incomes += transaction.amount;
      }
    }
  });

  return data;
};

const CustomDot = (props: any) => {
  const { cx, cy, value } = props;
  if (value > 0) {
    return (
      <circle cx={cx} cy={cy} r={3} stroke="none" fill="#18181b" />
    );
  }
  return null;
};

export const ActivityGraphs = ({ expenses, incomes, timeframe }: { expenses: Transaction[], incomes: Transaction[], timeframe: string }) => {
  const [data, setData] = useState<{ name: string, Expenses: number, Incomes: number }[]>([]);

  useEffect(() => {
    const { startDate, interval } = getTimeframeDates(timeframe);
    const allTransactions = [...expenses, ...incomes];
    const aggregatedData = aggregateData(allTransactions, startDate, interval);
    setData(aggregatedData);
  }, [expenses, incomes, timeframe]);

  return (
    <div className="w-full overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiActivity /> Recent Activity
        </h3>
      </div>

      <div className="h-[460px] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              className="text-xs font-bold"
              padding={{ right: 30 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="Incomes"
              stroke="#34b47d"
              fill="#34b47d"
              dot={<CustomDot />}
            />
            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#C63975"
              fill="#C63975"
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};