"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ScriptableContext,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { lusitana } from "../fonts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
  ArcElement,
  Filler
);

export default async function RevenueChart({ revenues }: { revenues: any }) {
  const labels = revenues.map((item: { month: string }) => item.month);
  const values = revenues.map(
    (item: { revenue: number }) => item.revenue / 1000
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `$${value}k`;
          },
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <Bar
          data={{
            labels,
            datasets: [
              { data: values, backgroundColor: "rgba(53, 162, 235, 0.5)" },
            ],
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
