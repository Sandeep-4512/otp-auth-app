import React, { useContext } from "react";
import AuthContext from "../../AuthContext";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const chartOptions = {
    chart: { type: "bar" },
    series: [{ name: "Users", data: [10, 20, 30, 40] }],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="chart-container">
        <Chart options={chartOptions} series={chartOptions.series} type="bar" />
      </div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
