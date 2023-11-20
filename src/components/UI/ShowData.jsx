/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { calculateFinancialHealthScore } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ShowData({ isUpdate }) {
  const [financialData, setFinancialData] = useState([]);
  const userId = localStorage.getItem("UserId");

  const fetchData = async () => {
    try {
      const url = `https://financial-health-calculator.vercel.app/api/v1/financial-score/${userId}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setFinancialData(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, isUpdate]);

  const isLoading = !financialData;

  const data = {
    labels: [
      "Total Debts",
      "Monthly Income",
      "Monthly Expenses",
      "Total Assets",
    ],
    datasets: [
      {
        label: "# of Amount",
        data: [
          financialData?.totalDebts,
          financialData?.monthlyIncome,
          financialData?.monthlyExpenses,
          financialData?.totalAssets,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const score = calculateFinancialHealthScore(
    financialData?.monthlyIncome,
    financialData?.monthlyExpenses,
    financialData?.totalDebts,
    financialData?.totalAssets
  );

  return (
    <div className="flex justify-center items-center text-center mb-8 ">
      <div>
        <h1 className={`text-2xl font-semibold my-4`}>
          {isLoading ? "No Data Available" : "Your Financial Health Data"}
        </h1>

        {financialData && (
          <div className="md:w-[500px] h-96 flex justify-center ">
            <div>
              <Pie data={data} />
              <p className="text-2xl font-bold my-1">
                Your Financial Health Score is: {score.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
