// components/Dashboard.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellReport } from '@/store/slices/api/sellReportSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from '@/components/Admin/Admin-Sidebar';
import { withAuth } from '@/utils/withAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: sellReport, status, error } = useSelector((state) => state.sellReport);

  useEffect(() => {
     dispatch(fetchSellReport({ startDate: '2024-08-01', endDate: '2024-08-30' }));
  }, [dispatch]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Income",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Expense Chart",
      },
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6">
          Welcome to the Admin Dashboard. Here you can manage users, view reports, and more.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
            <p>{status === 'loading' ? 'Loading...' : sellReport.totalRevenue}</p>
          </div>
          <div className="bg-green-500 text-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Total Products Sold</h2>
            <p>{status === 'loading' ? 'Loading...' : sellReport.totalProductsSold}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-12">
          <h2 className="text-xl font-semibold mb-6">Graph Chart</h2>
          <Bar data={data} options={options} height={100} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, { requireLogin: true, requireAdmin: true });
