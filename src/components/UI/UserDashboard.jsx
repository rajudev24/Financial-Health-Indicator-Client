/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Label = ({ text }) => <label htmlFor="">{text}</label>;

export default function UserDashboard({ setIsUpdate }) {
  const [data, setData] = useState({
    monthlyIncome: "",
    monthlyExpenses: "",
    totalDebts: "",
    totalAssets: "",
  });
  const userId = localStorage.getItem("UserId");

  const handleSubmit = async () => {
    const FinancialData = {
      monthlyIncome: parseInt(data.monthlyIncome),
      monthlyExpenses: parseInt(data.monthlyExpenses),
      totalDebts: parseInt(data.totalDebts),
      totalAssets: parseInt(data.totalAssets),
      userId,
    };
    try {
      const url =
        "https://financial-health-calculator.vercel.app/api/v1/financial-score/add-financial-data";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FinancialData),
      });
      if (response.ok) {
        toast.success("Calculating Health Score");
        setIsUpdate(true);
        setData("");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" my-8 max-sm:mx-8 ">
      <h1 className="text-center text-3xl my-4 font-bold">
        Calculate Your Financial Health Score{" "}
      </h1>
      <div className="md:w-[600px] m-auto">
        <Label text="Please Enter Your Monthly Income" />
        <Input
          className="h-10 my-2 border-2 "
          placeholder="Enter Monthly Income"
          type="number"
          value={data.monthlyIncome}
          onChange={(e) => setData({ ...data, monthlyIncome: e.target.value })}
          rules={[
            { required: true, message: "Please enter your Monthly Income!" },
          ]}
        />
        <Label text="Please Enter Your Monthly Expenses" />
        <Input
          className="h-10 my-2 border-2 "
          placeholder="Enter Monthly Expenses"
          type="number"
          value={data.monthlyExpenses}
          rules={[
            { required: true, message: "Please enter your Monthly Expenses!" },
          ]}
          onChange={(e) =>
            setData({ ...data, monthlyExpenses: e.target.value })
          }
        />
        <Label text="Please Enter Your Total Debts" />
        <Input
          className="h-10 my-2 border-2 "
          placeholder="Enter Total Debts"
          type="number"
          rules={[
            { required: true, message: "Please enter your Total Debts!" },
          ]}
          value={data.totalDebts}
          onChange={(e) => setData({ ...data, totalDebts: e.target.value })}
        />
        <Label text="Please Enter Your Total Assets" />
        <Input
          className="h-10 my-2 border-2 "
          placeholder="Enter Total Assets"
          type="number"
          rules={[
            { required: true, message: "Please enter your Total Assets!" },
          ]}
          value={data.totalAssets}
          onChange={(e) => setData({ ...data, totalAssets: e.target.value })}
        />

        <Button
          style={{
            backgroundColor: "#7f03fc",
            color: "white",
          }}
          size="large"
          onClick={handleSubmit}
        >
          Calculate Score
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
