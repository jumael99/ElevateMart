import { useState } from 'react';
import Sidebar from '@/components/Admin/Admin-Sidebar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
    productImagePreview: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          productImage: file,
          productImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.productName) tempErrors.productName = 'Product Name is required';
    if (!formData.productDescription) tempErrors.productDescription = 'Product Description is required';
    if (!formData.productPrice) tempErrors.productPrice = 'Product Price is required';
    if (!formData.productImage) tempErrors.productImage = 'Product Image is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
       console.log('Form submitted', formData);
    }
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Income',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expense Chart',
      },
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6">Welcome to the Admin Dashboard. Here you can manage users, view reports, and more.</p>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Product Orders</h2>
            <p>Details about product orders.</p>
          </div>
          <div className="bg-green-500 text-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
            <p>Details about income.</p>
          </div>
          <div className="bg-red-500 text-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Expense</h2>
            <p>Details about expense.</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-12 mt-6">
          <h2 className="text-xl font-semibold mb-6">Graph Chart</h2>
          <Bar data={data} options={options} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
